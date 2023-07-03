import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuantity } from "../../features/cart/cartSlice";
import Axios from "axios";

function ProductCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState(`lowPrice`);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    let response = await Axios.get(`http://localhost:8000/products`);
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
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSort = (value) => {
    setSort(value);
  };

  const handleProductClick = async (product) => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/products/${product.id_product}`
      );
      const selectedProduct = response.data;
      setSelectedProduct(selectedProduct);

      navigate(`/product/${product.id_product}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  useEffect(() => {
    if (sort === "lowPrice") {
      setProductList((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "highPrice") {
      setProductList((prev) => [...prev].sort((a, b) => b.price - a.price));
    } else if (sort === "aToZ") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (sort === "zToA") {
      setProductList((prev) =>
        [...prev].sort((a, b) => b.name.localeCompare(a.name))
      );
    }
  }, [sort]);

  const renderList = () => {
    return productsOnPage.map((product) => {
      return (
        <div
          className="bg-white shadow-lg overflow-hidden grid-cols-4 sm:grid-cols-2 h-auto"
          key={product.id_product}
        >
          <div className="relative flex flex-col overflow-hidden rounded-lg border">
            <img
              src={`http://localhost:8000/${product.image}`}
              alt={product.name}
              className="w-50 h-80 object-cover"
              onClick={() => handleProductClick(product)}
            />

            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
              <div className="mb-2 flex">
                <p className="mr-3 text-sm font-bold text-[#EDA415]">
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
              <p className="text-lg font-medium">{product.name}</p>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600"
            >
              <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-[#fcae14] group-hover:text-white">
                Add
              </div>
              <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                +
              </div>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full mx-auto md:w-full sm:w-full">
      <div className="flex items-center justify-center py-4 md:py-2 sm:py-0 sm:text-xs flex-wrap">
        <button
          type="button"
          className="text-slate-700 hover:text-white border-[#EDA415]  bg-white hover:bg-[#EDA415] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          onClick={handleCategoryChange}
          value="0"
        >
          All categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id_category}
            type="button"
            className="text-slate-700 hover:text-white border-[#EDA415]  bg-white hover:bg-[#EDA415] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            onClick={handleCategoryChange}
            value={category.id_category}
          >
            {category.category_name}
          </button>
        ))}
      </div>

      <div className="mb-3">
        <div className="relative mb-4 flex w-1/2 flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            onChange={handleSearchChange}
            aria-label="Search"
            aria-describedby="button-addon3"
          />

          <button
            type="submit"
            class="p-2.5 ml-2 text-sm font-medium hover:bg-slate-300 text-white bg-[#EDA415] rounded-lg border border-[#EDA415] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
      <div className="mb-4 mt-5">
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
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-2">
          {renderList()}
        </div>
      </div>
      <div className="place-items-center">
        <ul className="inline-flex items-center justify-center mx-auto -space-x-px my-8">
          <li>
            <button
              onClick={handlePreviousPage}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === index + 1
                    ? "bg-gray-200 text-gray-700 pointer-events-none"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNextPage}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductCard;
