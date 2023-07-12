import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ handleSearchChange }) {
  return (
    <div className="mb-3 lg:mx-10 sm:mx-0">
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
          className="p-2.5 ml-2 text-sm font-medium hover:bg-slate-300 text-white bg-[#EDA415] rounded-lg border border-[#EDA415] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaSearch className="w-5 h-5" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
