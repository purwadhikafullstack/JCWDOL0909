import React, { useEffect, useState } from "react";
import TransactionItem from "./transactionItem";
import Pagination from "./pagination";
import SearchBar from "./searchBar";
import AdminLayout from "../../../components/AdminLayout";
import moment from "moment";
import {
  fetchTransactions,
  fetchTransactionStatus,
} from "../Transaction/fetchApi";

function OrderListAdmin() {
  const [transactions, setTransactions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState([]);
  const adminToken = localStorage.getItem("admin_token");
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, currentPage, selectedStatus]);

  useEffect(() => {
    fetchTransactionStatusData();
  }, []);

  useEffect(() => {
    const filtered = Object.values(groupedTransactions).filter((group) => {
      const transactionStatusMatch =
        selectedStatus === 0 ||
        group.items.some(
          (item) => parseInt(item.id_transaction_status) === selectedStatus
        );
      const invoiceNumberMatch =
        searchQuery === "" ||
        group.items[0]?.invoice_number?.toUpperCase().includes(searchQuery);
      return transactionStatusMatch && invoiceNumberMatch;
    });
    filtered.sort((a, b) => {
      const dateA = moment(a.date);
      const dateB = moment(b.date);

      return dateA - dateB;
    });
    setFilteredTransactions(filtered);
  }, [selectedStatus, groupedTransactions, searchQuery]);

  useEffect(() => {
    const grouped = transactions.reduce((result, transaction) => {
      const { id_transaction, date } = transaction;
      if (!result[id_transaction]) {
        result[id_transaction] = {
          id_transaction,
          items: [],
        };
      }
      result[id_transaction].items.push(transaction);
      result[id_transaction]["date"] = date;
      return result;
    }, {});
    setGroupedTransactions(grouped);
  }, [transactions]);

  const fetchData = async () => {
    try {
      const { transactions, totalPages } = await fetchTransactions(
        selectedStatus,
        startDate,
        endDate,
        currentPage,
        pageSize,
        adminToken
      );
      setTransactions(transactions);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactionStatusData = async () => {
    try {
      const data = await fetchTransactionStatus();
      setTransactionStatus(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (statusId) => {
    const selectedStatusNumber = parseInt(statusId);
    setSelectedStatus(selectedStatusNumber);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
    <>
      <AdminLayout>
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
                  onClick={() =>
                    handleStatusChange(status.id_transaction_status)
                  }
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
          {transactions.length > 0 ? (
            <>
              {filteredTransactions.map((group) => (
                <TransactionItem key={group.id_transaction} group={group} />
              ))}
              <div className="flex justify-center mt-8 mb-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center my-52">
              <p className="text-gray-500 text-lg">No order recorded</p>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default OrderListAdmin;
