import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState([]);
  const userToken = localStorage.getItem("user_token");
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTransactions();
    fetchTransactionStatus();
  }, []);

  useEffect(() => {
    const filtered = Object.values(groupedTransactions).filter((group) => {
      const transactionStatusMatch =
        selectedStatus === 0 ||
        group.items[0].id_transaction_status === selectedStatus;
      const invoiceNumberMatch =
        searchQuery === "" ||
        group.items[0].invoiceNumber.includes(searchQuery);
      return transactionStatusMatch && invoiceNumberMatch;
    });
    setFilteredTransactions(filtered);
  }, [selectedStatus, groupedTransactions, searchQuery]);

  useEffect(() => {
    const grouped = transactions.reduce((result, transaction) => {
      const { id_transaction } = transaction;
      if (!result[id_transaction]) {
        result[id_transaction] = {
          id_transaction,
          items: [],
        };
      }
      result[id_transaction].items.push(transaction);
      return result;
    }, {});
    setGroupedTransactions(grouped);
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/transactions/fetchTransaction",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactionStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/transactions/fetchTransactionStatus"
      );

      setTransactionStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = (statusId) => {
    setSelectedStatus(parseInt(statusId));
    setCurrentPage(1);
  };

  const handleOrderClick = async (transactionId) => {
    try {
      setSelectedOrder(transactionId);
      navigate(`/payment/${transactionId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex
  );

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Set ulang transaksi yang terfilter agar data diambil ulang
  };

  return (
    <div>
      <div className="flex justify-center space-x-4 mt-8">
        <button
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold ${
            selectedStatus === 0 ? "bg-gray-300" : ""
          }`}
          onClick={() => handleStatusChange(0)}
        >
          <span className="text-base">All</span>
        </button>
        {transactionStatus.map((status) => (
          <button
            key={status.id_transaction_status}
            className={`px-4 py-2 rounded hover:bg-yellow-200 text-yellow-800 font-semibold ${
              selectedStatus === status.id_transaction_status
                ? "bg-yellow-200"
                : ""
            }`}
            onClick={() => handleStatusChange(status.id_transaction_status)}
          >
            <span className="text-base">{status.status_name}</span>
          </button>
        ))}
      </div>

      <form className="flex items-center ml-52 mt-8">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-1/4 justify-end">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            value={searchQuery}
            onChange={handleSearch}
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      </form>

      {displayedTransactions.map((group) => (
        <div
          key={group.id_transaction}
          className="max-w-7xl mx-auto bg-white shadow-2xl p-8 mt-8"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-base font-semibold">Invoice number</h3>
              <p className="text-gray-600 text-sm">
                {group.items[0].invoiceNumber}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-base font-semibold text-right bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                {group.items[0].status_name}
              </p>
            </div>
          </div>

          <div className="mb-2">
            <h3 className="text-lg font-semibold">Items</h3>
            {group.items.map((item) => (
              <div
                key={item.id_transaction_product}
                className="flex items-center mb-4"
              >
                <img
                  src={`http://localhost:8000/${item.image}`}
                  alt="Product"
                  className="w-20 h-16 mr-4"
                />
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-gray-600">x {item.quantity}</p>
                </div>
                <p className="ml-auto font-medium">
                  {item.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold">Subtotal</h3>
              <p className="font-semibold">
                {group.items[0].total_price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold">Shipping</h3>
              <p className="font-semibold">
                {group.items[0].shipping_cost.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold">Shipping Method</h3>
              <p className="font-semibold">{group.items[0].shipping_method}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold">Total</h3>
              <p className="text-sm font-semibold">
                {(
                  Number(group.items[0].total_price) +
                  Number(group.items[0].shipping_cost)
                ).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <h3 className="text-sm font-semibold">
                {group.items[0].date.substring(0, 10)}
              </h3>
            </div>
            <div className="flex justify-center items-center mt-4">
              {group.items[0].id_transaction_status === 1 && (
                <>
                  <button
                    onClick={() =>
                      handleOrderClick(group.items[0].id_transaction)
                    }
                    className="bg-yellow-200 border-2 hover:bg-sky-900 hover:text-white font-semibold py-1 px-2 rounded"
                  >
                    Pay Now
                  </button>
                  <button className="bg-yellow-200 border-2 mx-10 hover:bg-sky-900 hover:text-white font-semibold py-1 px-2 rounded">
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-8 mb-10">
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
                  class="w-2.5 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                  class="w-2.5 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default OrderList;
