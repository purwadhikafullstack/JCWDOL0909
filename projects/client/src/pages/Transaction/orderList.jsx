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
        {},
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

      <div className="max-w-7xl mx-auto bg-white shadow-2xl p-8 mt-8">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-semibold">Tracking number</h3>
            <p className="text-gray-600 text-sm">51547878755545848512</p>
          </div>
          <div className="flex items-center">
            <p className="text-base font-semibold text-right bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
              Waiting for paid
            </p>
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-lg font-semibold">Items</h3>
          <div className="flex items-center mb-4">
            <img
              src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg"
              alt="Model wearing men's charcoal basic tee in large."
              className="w-20 h-auto mr-4"
            />
            <div>
              <h4 className="text-sm font-medium">Basic Tee</h4>
              <p className="text-gray-600">x 1</p>
            </div>
            <p className="ml-auto font-medium">$36.00</p>
          </div>
          <div className="flex items-center">
            <img
              src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-02.jpg"
              alt="Model wearing women's artwork tee with isometric dots forming a cube in small."
              className="w-20 h-auto mr-4"
            />
            <div>
              <h4 className="text-sm font-medium">Artwork Tee — Iso Dots</h4>
              <p className="text-gray-600">x 2</p>
            </div>
            <p className="ml-auto font-medium">$36.00</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <h3 className="text-sm font-semibold">Subtotal</h3>
            <p className="font-semibold">$72.00</p>
          </div>
          <div className="flex justify-between">
            <h3 className="text-sm font-semibold">Shipping</h3>
            <p className="font-semibold">$8.00</p>
          </div>
          <div className="flex justify-between">
            <h3 className="text-sm font-semibold">Taxes</h3>
            <p className="font-semibold">$6.40</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="text-sm font-semibold">Total</h3>
            <p className="text-sm font-semibold">$86.40</p>
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
    </div>
  );
}

export default OrderList;
