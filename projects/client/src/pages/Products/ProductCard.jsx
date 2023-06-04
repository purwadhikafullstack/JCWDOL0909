import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuantity } from "../../features/cart/cartSlice";
import Axios from "axios";

import { Input, Select, Button, ButtonGroup } from "@chakra-ui/react";

function ProductCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    Axios.get("http://localhost:8000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchProductsData = async () => {
    let response = await Axios.get(`http://localhost:8000/products/getProduct`);
    setProductList(response.data);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id_product === product.id_product
    );
    if (existingItem) {
      dispatch(increaseQuantity(product.id_product));
    } else {
      dispatch(addItem({ ...product, quantity: 1 }));
    }
    alert("berhasil menambahkan ke keranjang");
  };

  const [sort, setSort] = useState(`newest`);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategoryChange = (e) => {
    setSelectedCategory(parseInt(e.target.value));
    setCurrentPage(1);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts =
    selectedCategory === 0
      ? products
      : products.filter((p) => p.id_category === selectedCategory);
  const filteredProductsBySearchTerm = filteredProducts.filter((p) =>
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsOnPage = filteredProductsBySearchTerm.slice(
    startIndex,
    endIndex
  );

  const totalPages = Math.ceil(
    filteredProductsBySearchTerm.length / itemsPerPage
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderList = () => {
    return productsOnPage.map((product) => {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <img
              src={`http://localhost:8000/${product.product_img}`}
              alt={product.product_name}
              className="h-auto max-w-full rounded-lg"
            />
          </div>

          <div key={product.id_product} className="p-4">
            <h2 className="text-lg font-medium">{product.product_name}</h2>
            <p className="text-lg font-medium text-gray-800">
              {product.product_price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p className="text-gray-600 text-sm mt-2">{product.product_desc}</p>

            <Button
              onClick={() => handleAddToCart(product)}
              variant="solid"
              colorScheme="pink"
            >
              Buy
            </Button>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  useEffect(() => {
    if (sort === "newest") {
      setProductList((prev) =>
        [...prev].sort((a, b) => b.id_product - a.id_product)
      );
    } else if (sort === "lowPrice") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.product_price - b.product_price)
      );
    } else if (sort === "highPrice") {
      setProductList((prev) =>
        [...prev].sort((a, b) => b.product_price - a.product_price)
      );
    } else if (sort === "asc") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.product_name.localeCompare(b.product_name))
      );
    } else if (sort === "desc") {
      setProductList((prev) =>
        [...prev].sort((a, b) => b.product_name.localeCompare(a.product_name))
      );
    }
  }, [sort]);

  return (
    <div className="w-full mx-auto">
      <p className="text-2xl font-sans text-amber-500">PRODUCT LIST</p>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          onClick={handleCategoryChange}
          value="0"
        >
          All categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id_category}
            type="button"
            className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            onClick={handleCategoryChange}
            value={category.id_category}
          >
            {category.category_name}
          </button>
        ))}
      </div>

      <Input placeholder="Search..." onChange={handleSearchChange} />
      <Select placeholder="Sorted By" onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="lowPrice">Lowest Price</option>
        <option value="highPrice">Highest Price</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </Select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {renderList()}
      </div>
      <div className="items-center hidden space-x-8 lg:flex">
        <Button
          variant="solid"
          colorScheme="pink"
          onClick={() => {
            navigate("/product/addproduct");
          }}
        >
          add new product
        </Button>
      </div>

      {Array.from({ length: totalPages }, (_, index) => (
        <ButtonGroup variant="outline" spacing="3">
          <Button
            colorScheme="blue"
            key={index}
            onClick={() => handlePageChange(index + 1)}
          >
            {" "}
            {index + 1}
          </Button>
        </ButtonGroup>
      ))}
    </div>
  );
}

export default ProductCard;
