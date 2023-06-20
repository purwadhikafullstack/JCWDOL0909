import React from "react";
import { Button } from "flowbite-react";
import Carousel from "../../components/Carousel";
import SearchBar from "../../components/SearchBar";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import Menu from "../../components/Menu";
import Category from "../../components/Category";
import { Footer } from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

function Home() {
  return (
    <>
      {/* Navbar */}
      <div className="flex flex-col gap-1 items-center justify-center border-solid max-w-6xl mx-auto w">
        <div className="h-16 w-full flex items-center justify-between border-b-2 pb-4 bg-[#003F62] pt-4">
          <div className="ml-3">
            <SearchBar />
          </div>
          <div className="mr-1 md:mr-3 inline-flex rounded-md shadow-sm">
            <Menu />
            <SignIn />
            <SignUp />
            <div className="sm:hidden">
              {/* Tambahkan tombol atau elemen lain untuk mengaktifkan menu di tampilan mobile */}
            </div>
          </div>
        </div>
        <Carousel />
        <div className="Category bg-white w-full flex flex-col items-start px-4 py-4">
          <div className=" mb-4 border-b-2 border-gray-200 w-full shadow-sm flex flex-row justify-between">
            <h1 className="text-xs sm:text-base text-bold lg:text-lg text-bold uppercase">
              Category
            </h1>
            <h1 className="text-xs sm:text-base text-bold lg:text-lg text-bold uppercase">
              Lihat Semua
            </h1>
          </div>
          <Category />
        </div>
        <div className="w-full">
          <ProductCard />
        </div>
        <div className="sm:text-center md:flex lg:grid bg-white w-full flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;

/* <div>
Page
<div className=" flex flex-row h-8 w-screen justify-center">
  <div className=" bg-slate-800">Box 1</div>
  <div className=" ">Box 2</div>
</div>
{/* Carousel */

/* <div className="Carousel bg-slate-600">Box 3</div>
<div className="Category bg-red-700">Box 4</div>
<div className="Product bg-blue-800">Box 5</div>
<div className="Footer bg-yellow-500">Box 6</div>
</div> */

// className="Container flex flex-col mx-auto w-3/4 justify-center items-center bg-orange-300"

// Sign in and Up button

/* <div className="inline-flex rounded-md shadow-sm">
<a
  href="#"
  aria-current="page"
  className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
>
  Sign In
</a>
<a
  href="#"
  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
>
  Sign Up
</a>
</div> */

/* <div className="flex flex-col items-center">
<form className="flex items-center mx-auto my-2 md:my-0 md:mr-4">
  <div className="relative w-full md:w-64">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-gray-500 dark:text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
    <input
      type="text"
      id="simple-search"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search Here"
      required
    />
  </div>
  <button
    type="submit"
    className="p-2.5 ml-2 text-sm font-medium text-white bg-[#EDA415] rounded-lg border border-[#EDA415] hover:bg-[#f7ac16] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
    <span className="sr-only">Search...</span>
  </button>
</form>
<div className="inline-flex mt-2 md:mt-0 rounded-md shadow-sm">
  <a
    href="#"
    aria-current="page"
    className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
  >
    Sign In
  </a>
  <a
    href="#"
    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
  >
    Sign Up
  </a>
</div>
</div> */
