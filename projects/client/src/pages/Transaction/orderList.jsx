import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { format, endOfDay, addDays } from "date-fns";
import TransactionItem from "./transactionItem";
import Pagination from "./pagination";
import SearchBar from "./searchBar";

function OrderList() {
  const [transactions, setTransactions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState([]);
  const userToken = localStorage.getItem("user_token");
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

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
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        startDate={startDate}
        endDate={endDate}
        handleDateRangeChange={handleDateRangeChange}
        showCalendar={showCalendar}
        toggleCalendar={toggleCalendar}
      />
      {displayedTransactions.map((group) => (
        <TransactionItem
          key={group.id_transaction}
          group={group}
          handleOrderClick={handleOrderClick}
        />
      ))}
      <div className="flex justify-center mt-8 mb-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default OrderList;
