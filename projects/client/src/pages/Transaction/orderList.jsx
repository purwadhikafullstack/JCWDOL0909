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

  useEffect(() => {
    fetchTransactions();
    fetchTransactionStatus();
  }, []);

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

  const groupedTransactions = {};

  transactions.forEach((transaction) => {
    if (!groupedTransactions[transaction.id_transaction]) {
      groupedTransactions[transaction.id_transaction] = {
        id_transaction: transaction.id_transaction,
        items: [],
      };
    }
    groupedTransactions[transaction.id_transaction].items.push(transaction);
  });

  const handleStatusChange = (statusId) => {
    setSelectedStatus(parseInt(statusId));
  };

  const handleOrderClick = async (transactionId) => {
    try {
      setSelectedOrder(transactionId);
      // Navigasi ke halaman pembayaran dengan menggunakan id_transaction
      navigate(`/payment/${transactionId}`);
    } catch (error) {
      console.log(error);
    }
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

      {Object.values(groupedTransactions)
        .filter(
          (group) =>
            selectedStatus === 0 ||
            group.items[0].id_transaction_status === selectedStatus
        )
        .map((group) => (
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
                <p className="font-semibold">
                  {group.items[0].shipping_method}
                </p>
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
    </div>
  );
}

export default OrderList;
