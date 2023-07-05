import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function OrderList() {
  const [transactions, setTransactions] = useState([]);
  const userToken = localStorage.getItem("user_token");

  useEffect(() => {
    fetchTransactions();
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

  return (
    <div>
      <div className="flex justify-center space-x-4 mt-8">
        <a
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
          href="/user/purchase?type=6"
        >
          <span className="text-base">All</span>
        </a>
        <a
          className="px-4 py-2 rounded hover:bg-yellow-200 text-yellow-800 font-semibold"
          href="/user/purchase?type=9"
        >
          <span className="text-base">Waiting Payment</span>
        </a>
        <a
          className="px-4 py-2 rounded hover:bg-yellow-200 text-yellow-800 font-semibold"
          href="/user/purchase?type=7"
        >
          <span className="text-base">Waiting confirmation payment</span>
        </a>
        <a
          className="px-4 py-2 rounded hover:bg-green-200 text-green-800 font-semibold"
          href="/user/purchase?type=8"
        >
          <span className="text-base">Processed</span>
        </a>
        <a
          className="px-4 py-2 rounded hover:bg-gray-200 text-gray-800 font-semibold"
          href="/user/purchase?type=3"
        >
          <span className="text-base">On Delivery</span>
        </a>
        <a
          className="px-4 py-2 rounded hover:bg-red-200 text-red-800 font-semibold"
          href="/user/purchase?type=4"
        >
          <span className="text-base">Cancelled</span>
        </a>
        <a
          className="px-4 py-2 rounded hover:bg-purple-200 text-purple-800 font-semibold"
          href="/user/purchase?type=12"
        >
          <span className="text-base">Order Confirmed</span>
        </a>
      </div>

      {Object.values(groupedTransactions).map((group) => (
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
                {" "}
                <img
                  src={`http://localhost:8000/${item.image}`}
                  alt="Model wearing men's charcoal basic tee in large."
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
            <div className="flex justify-center items-center mt-4">
              <button className="bg-yellow-200 border-2 hover:bg-sky-900 hover:text-white font-semibold py-1 px-2 rounded">
                Pay Now
              </button>
              <button className="bg-yellow-200 border-2 mx-10 hover:bg-sky-900 hover:text-white font-semibold py-1 px-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
