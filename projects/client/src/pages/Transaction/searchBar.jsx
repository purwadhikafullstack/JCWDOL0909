import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchBar({
  searchQuery,
  handleSearch,
  startDate,
  endDate,
  handleDateRangeChange,
  showCalendar,
  toggleCalendar,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-start lg:justify-between mx-4 md:mx-52 lg:mt-4">
      <div className="relative w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-4">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search branch name..."
          value={searchQuery}
          onChange={handleSearch}
          required
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300```jsx
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>

      <div className="w-full md:w-auto mt-4 md:mt-0">
        <div className="relative">
          <button
            type="button"
            className="border border-gray-300 rounded p-2 w-full text-left"
            onClick={toggleCalendar}
          >
            {startDate && endDate
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : "Select Date Range"}
          </button>
          {showCalendar && (
            <div className="absolute mt-2 z-10">
              <DatePicker
                selected={startDate}
                onChange={handleDateRangeChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                className="border border-gray-300 rounded p-2"
                wrapperClassName="w-full"
                calendarClassName="bg-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
