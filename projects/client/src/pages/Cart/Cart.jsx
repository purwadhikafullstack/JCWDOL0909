import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  decreaseQuantity,
  increaseQuantity,
} from "../../features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleDecreaseQuantity = (id) => {
    alert(id);
    dispatch(decreaseQuantity(id));
  };

  const handleIncreaseQuantity = (id) => {
    alert(id);
    dispatch(increaseQuantity(id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product_price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col h-10 mx-auto max-w-2xl">
      <p className="text-lg font-bold text-gray-600">Shopping Cart</p>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.id_product} className="py-4 flex">
              <div className="ml-6 flex-1 flex flex-col justify-between">
                <div className="flex">
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-900">
                      {item.product_name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.product_description}
                    </p>
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
                      <p className="text-lg font-medium text-gray-900">
                        {item.product_price.toLocaleString("id-ID", {
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
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Total</p>
            <p class="text-2xl font-semibold text-gray-900">
              {" "}
              {totalPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
          <div class="mt-6 text-center">
            <button
              type="button"
              class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
            >
              Checkout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
