import React from "react";

function Pagination({ currentPage, totalPages, handlePageChange }) {
  return (
    <nav>
      <ul className="pagination flex space-x-2">
        <li>
          <button
            className={`${
              currentPage === 1 ? "bg-gray-300" : "bg-white"
            } font-medium px-4 py-2 rounded`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;

          return (
            <li key={page}>
              <button
                className={`${
                  isActive ? "bg-blue-900 text-white" : "bg-white"
                } font-medium px-4 py-2 rounded`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li>
          <button
            className={`${
              currentPage === totalPages ? "bg-gray-300" : "bg-white"
            } font-medium px-4 py-2 rounded`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
