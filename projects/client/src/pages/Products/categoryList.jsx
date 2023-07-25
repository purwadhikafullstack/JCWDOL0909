import React from "react";

function CategoryList({ categories, handleCategoryChange }) {
  return (
    <div className="category-list-container flex flex-wrap justify-center py-4">
      <button
        type="button"
        className="category-button text-slate-700 hover:text-white bg-white border-red-200 border-2 hover:bg-[#EDA415] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        onClick={handleCategoryChange}
        value="0"
      >
        All categories
      </button>
      {categories.map((category) => (
        <button
          key={category.id_category}
          type="button"
          className="category-button text-slate-700 hover:text-white border-red-200 border-2 bg-white hover:bg-[#EDA415] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          onClick={handleCategoryChange}
          value={category.id_category}
        >
          {category.category_name}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
