import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, endOfDay, addDays } from "date-fns";

function OrderList() {
  const [transactions, setTransactions] = useState([]);
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    fetchTransactions();
    fetchTransactionStatus();
  }, [startDate, endDate]);

  useEffect(() => {
    const filtered = Object.values(groupedTransactions).filter((group) => {
      const transactionStatusMatch =
        selectedStatus === 0 ||
        group.items[0].id_transaction_status === selectedStatus;
      const invoiceNumberMatch =
        searchQuery === "" ||
        group.items[0].invoiceNumber.toUpperCase().includes(searchQuery);
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
      let formattedStartDate = null;
      let formattedEndDate = null;

      if (startDate) {
        const startOfDayUTC = endOfDay(startDate);
        formattedStartDate = format(
          startOfDayUTC,
          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        );
      }

      if (endDate) {
        const endOfDayUTC = endOfDay(addDays(endDate, 1)); // Tambahkan 1 hari pada endDate
        formattedEndDate = format(endOfDayUTC, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      }

      const response = await axios.get(
        "http://localhost:8000/transactions/fetchTransaction",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
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
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);
  };

  const handleDateRangeChange = (range) => {
    setStartDate(range[0]);
    setEndDate(range[1]);
    setShowCalendar(false);
  };
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      <div className="flex justify-center mt-8">
        <div className="space-x-4">
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
      </div>

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
            className="absolute inset-y-0 right-0 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              <h3 className="text-sm font-semibold text-red-400">
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
