import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";

function ProductStock() {
  const adminToken = localStorage.getItem("admin_token");
  const [histories, setHistories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchHistoriesProduct();
  }, []);

  const fetchHistoriesProduct = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/stock/fetchStockHistories`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setHistories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = histories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="w-full mt-8">
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-gray-200 text-left">Date</th>
                <th className="py-4 px-6 bg-gray-200 text-left">
                  Product Name
                </th>
                <th className="py-4 px-6 bg-gray-200 text-left">Store</th>
                <th className="py-4 px-6 bg-gray-200 text-left">Reason</th>
                <th className="py-4 px-6 bg-gray-200 text-left">
                  Adjustment Stock
                </th>
                <th className="py-4 px-6 bg-gray-200 text-left">Stock After</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((history) => (
                <tr key={history.id_stock}>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {moment(history.date).add(7, "hours").format("YYYY-MM-DD")}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {history.name}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {history.store}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {history.reason}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {history.adjustment} {history.adjustment_stock}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {history.stock_after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <div className="flex justify-center items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>{" "}
            </button>
            {[...Array(Math.ceil(histories.length / itemsPerPage)).keys()].map(
              (pageNumber) => (
                <button
                  key={pageNumber + 1}
                  onClick={() => paginate(pageNumber + 1)}
                  className={`mx-1 px-3 py-1 ${
                    currentPage === pageNumber + 1
                      ? "bg-blue-800 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {pageNumber + 1}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(histories.length / itemsPerPage)
              }
              className={`mx-1 px-3 py-1 ${
                currentPage === Math.ceil(histories.length / itemsPerPage)
                  ? "bg-gray-300"
                  : "bg-blue-800 text-white"
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductStock;
