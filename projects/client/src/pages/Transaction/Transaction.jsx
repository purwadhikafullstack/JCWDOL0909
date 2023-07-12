import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Axios from "axios";
import {
  setOrderId,
  setTransactionDate,
  setTotalPrice,
  resetTransaction,
} from "../../features/transaction/transactionSlice";
import { resetCart } from "../../features/cart/cartSlice";
import Swal from "sweetalert2";

function Transaction() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shippingList, setShippingList] = useState([]);
  const [selectedShippingId, setSelectedShippingId] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [fixedShippingCost, setFixedShippingCost] = useState(0);

  const cartItems = useSelector((state) => state.cart.items);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const userToken = localStorage.getItem("user_token");
  // const shippingCost = 15000;
  const transactionDate = moment().format("YYYY-MM-DD");
  const total = subtotal + shippingCost;
  const orderId = useSelector((state) => state.transaction.orderId);
  const idProduct = cartItems.map((item) => item.id_product);
  const quantity = cartItems.map((item) => item.quantity);
  const fetchShippingData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/transactions/fetchTransactionShipping"
      );
      setShippingList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const generateOrderId = () => {
    const timestamp = moment().format("YYYYMMDDHHmm");
    const randomString = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();
    const orderId = `${timestamp}-${randomString}`;
    return orderId;
  };

  useEffect(() => {
    const orderId = generateOrderId();
    dispatch(setOrderId(orderId));
    dispatch(setTransactionDate(transactionDate));
    dispatch(setTotalPrice(total));
  }, [dispatch, total, transactionDate]);

  useEffect(() => {
    fetchShippingData();
  }, []);

  const handleSubmitOrder = async () => {
    const productData = cartItems.map((item) => ({
      id_product: item.id_product,
      quantity: item.quantity,
    }));

    const transactionData = {
      productData,
      invoice_number: orderId,
      date: transactionDate,
      id_shipping: selectedShippingId,
      total_price: total,
    };

    try {
      const response = await Axios.post(
        "http://localhost:8000/transactions/createTransaction",
        transactionData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Your order has been placed successfully with ORDER ID: ${orderId}`,
      });
      // setIsModalOpen(true); // Setelah berhasil mengirim data, buka modal
      dispatch(resetCart());
      dispatch(resetTransaction());
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const selectedShipping = shippingList.find(
      (shipping) => shipping.id_shipping === selectedShippingId
    );
    if (selectedShipping) {
      setFixedShippingCost(selectedShipping.shipping_cost);
    } else {
      setFixedShippingCost(0);
    }
  }, [selectedShippingId, shippingList]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex flex-col items-center  border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base ">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-slate-600 px-2 py-4 sm:px-6 ">
            {cartItems.map((item) => (
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={`http://localhost:8000/${item.image}`}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="float-right text-gray-400">
                    Qty: {item.quantity}
                  </span>
                  <p className="text-lg font-bold">Rp {item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <select
                    name="shipping"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={selectedShippingId}
                    onChange={(event) =>
                      setSelectedShippingId(event.target.value)
                    }
                    required
                  >
                    <option value="">Select Shipping Method</option>
                    {shippingList.map((shipping) => (
                      <option
                        key={shipping.id_shipping}
                        value={shipping.id_shipping}
                      >
                        {shipping.shipping_method} - Rp {shipping.shipping_cost}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>
            {/* <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div> */}
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-xl font-medium">Order Details</p>
              <p className="text-gray-400">Check your order details.</p>
            </div>
            <div>
              <p className="text-xl font-medium">Order ID</p>
              <p className="text-gray-400">{orderId}</p>
            </div>
            <div>
              <p className="text-xl font-medium">Transaction Date</p>
              <p className="text-gray-400">{transactionDate}</p>
            </div>
          </div>
          <div className="">
            {/* <!-- Total --> */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">Rp {subtotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Shipping Cost
                </p>
                <p className="font-semibold text-gray-900">Rp {shippingCost}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">Rp {total}</p>
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={handleSubmitOrder}
          >
            Place Order
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white shadow-lg p-8 rounded-lg border-2">
                <h2 className="text-xl font-semibold mb-4">
                  Order Confirmation
                </h2>
                <p>
                  Your order has been placed successfully with ID: {orderId}
                </p>
                <div className="flex justify-center">
                  <button
                    className="mt-4 bg-gray-900 text-white px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Transaction;
