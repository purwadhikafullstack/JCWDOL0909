import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  decreaseQuantity,
  increaseQuantity,
} from "../../features/cart/cartSlice";
import Swal from "sweetalert2";
import emptyCart from "../../img/EmptyCart_3-Copy-removebg-preview.png";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem(id));
        Swal.fire(
          "Removed!",
          "The item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  const handleDecreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id_product === id);
    if (item.quantity === 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "This item will be removed from your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeItem(id));
          Swal.fire(
            "Removed!",
            "The item has been removed from your cart.",
            "success"
          );
        }
      });
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const handleIncreaseQuantity = (id) => {
    // alert(id);
    dispatch(increaseQuantity(id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col h-30 mx-auto max-w-l mt-20">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img src={emptyCart} alt="Empty Cart" className="w-40 h-30" />
          <p className="text-lg text-red-600 mt-4">Your cart is empty.</p>
          <p className="text-sm text-gray-500 mt-2">
            It looks like you haven't added any products to your cart.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#EDA415]">
          {cartItems.map((item) => (
            <li key={item.id_product} className="py-4 flex">
              <div className="ml-6 flex-1 flex flex-col justify-between">
                <div className="flex">
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-[#EDA415]">
                      {item.name}
                    </h2>
                  </div>
                  <div className="ml-4 flex-shrink-0 flow-root">
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => handleRemoveItem(item.id_product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <p className="text-l font-medium">
                        {item.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => handleDecreaseQuantity(item.id_product)}
                      >
                        -
                      </button>
                      <div className="mx-2">{item.quantity}</div>

                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => handleIncreaseQuantity(item.id_product)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-[#EDA415]">Total</p>
            <p className="text-l font-semibold">
              {" "}
              {totalPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
          <div className="mt-6 text-center">
            <button
              type="button"
              className="group inline-flex w-full items-center justify-center rounded-md bg-[#EDA415] px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
            >
              Checkout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </ul>
      )}
    </div>
  );
}

export default Cart;
