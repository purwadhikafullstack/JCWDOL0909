import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuantity } from "../../features/cart/cartSlice";
import Axios from "axios";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import ProductList from "./productList";
import Pagination from "./pagination";
import CategoryList from "./categoryList";
import SearchBar from "./searchBar";
import { handleAddToCart, handleProductClick } from "./handleProduct";

function ProductCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const userGlobal = useSelector((state) => state.users.user);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("lowPrice");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_BASE_URL}/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCartClick = (product) => {
    handleAddToCart(
      navigate,
      product,
      userGlobal,
      cartItems,
      dispatch,
      addItem,
      increaseQuantity
    );
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleProductClickAction = (product) => {
    handleProductClick(product, navigate);
  };

  const filteredProducts =
    selectedCategory === 0
      ? products
      : products.filter((p) => p.id_category === selectedCategory);

  const filteredProductsBySearchTerm = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProductsBySearchTerm].sort((a, b) => {
    if (sort === "lowPrice") {
      return a.price - b.price;
    } else if (sort === "highPrice") {
      return b.price - a.price;
    } else if (sort === "aToZ") {
      return a.name.localeCompare(b.name);
    } else if (sort === "zToA") {
      return b.name.localeCompare(a.name);
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsOnPage = sortedProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="w-full mx-auto ">
      <CategoryList
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />
      <SearchBar handleSearchChange={handleSearchChange} />

      <div className="mb-4 mt-5 lg:mx-10">
        <div className="flex mb-5">
          <button
            className={`mr-2 py-2 px-4 rounded hover:bg-yellow-200 ${
              sort === "lowPrice" ? "bg-[#EDA415]  text-white" : "bg-gray-200"
            }`}
            onClick={() => handleSort("lowPrice")}
          >
            <span>&#x2191;</span>
          </button>
          <button
            className={`py-2 px-4 rounded hover:bg-yellow-200 ${
              sort === "highPrice" ? "bg-[#EDA415] text-white" : "bg-gray-200"
            }`}
            onClick={() => handleSort("highPrice")}
          >
            <span>&#x2193;</span>
          </button>
          <button
            className={`ml-6 mr-2 py-2 px-4 rounded hover:bg-yellow-200 ${
              sort === "aToZ" ? "bg-[#EDA415] text-white" : "bg-gray-200"
            }`}
            onClick={() => handleSort("aToZ")}
          >
            <FaSortAlphaDown
              className={`sort-icon ${sort === "aToZ" ? "text-white" : ""}`}
            />
          </button>
          <button
            className={`py-2 px-4 rounded hover:bg-yellow-200 ${
              sort === "zToA" ? "bg-[#EDA415] text-white" : "bg-gray-200"
            }`}
            onClick={() => handleSort("zToA")}
          >
            <FaSortAlphaUp
              className={`sort-icon ${sort === "zToA" ? "text-white" : ""}`}
            />
          </button>
        </div>
        <ProductList
          products={productsOnPage}
          handleProductClick={handleProductClickAction}
          handleAddToCart={handleAddToCartClick}
        />
      </div>
      <Pagination
        className="justify-center"
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}
export default ProductCard;
