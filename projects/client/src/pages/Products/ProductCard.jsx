import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuantity } from "../../features/cart/cartSlice";
import Axios from "axios";

import { Select, Button, ButtonGroup } from "@chakra-ui/react";

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
    let response = await Axios.get(`http://localhost:8000/products/product`);
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
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div>
            <img
              src={`http://localhost:8000/${product.product_image}`}
              alt={product.product_name}
              className="w-full h-48 object-cover"
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
            <p className="text-gray-600 text-sm mt-2">
              {product.product_description}
            </p>

            <button
              onClick={() => handleAddToCart(product)}
              className="bg-cyan-300 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            >
              Buy
            </button>
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
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          className="text-white hover:text-white border  bg-cyan-300 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          onClick={handleCategoryChange}
          value="0"
        >
          All categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id_category}
            type="button"
            className="text-white hover:text-white border  bg-cyan-300 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            onClick={handleCategoryChange}
            value={category.id_category}
          >
            {category.category_name}
          </button>
        ))}
      </div>
      <div className="items-center hidden space-x-8 lg:flex my-5">
        <button
          onClick={() => {
            navigate("/product/addproduct");
          }}
          className="bg-cyan-300 rounded-lg hover:bg-slate-500 text-white font-bold py-2 px-4"
        >
          add new product
        </button>
      </div>
      <div class="mb-3">
        <div class="relative mb-4 flex w-1/2 flex-wrap items-stretch">
          <input
            type="search"
            class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            onChange={handleSearchChange}
            aria-label="Search"
            aria-describedby="button-addon3"
          />

          <button
            className="bg-cyan-300 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-2xl"
            type="button"
            id="button-addon3"
            data-te-ripple-init
          >
            Search
          </button>
        </div>
      </div>
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
