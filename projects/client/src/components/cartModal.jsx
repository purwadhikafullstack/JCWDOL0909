import React, { useRef, useEffect } from "react";
import CartPage from "../pages/Cart/Cart";
import { XIcon } from "@heroicons/react/outline";

const CartModal = ({ closeModal }) => {
  const modalRef = useRef(null);

  const closeModalHandler = () => {
    closeModal();
  };

  return (
    <div>
      <div className="fixed z-10 inset-0 h-screen">
        <div className="flex items-center justify-end mt-20 mr-20">
          <div
            className="bg-white p-8 rounded"
            style={{ maxWidth: "400px", border: "1px solid black" }}
          >
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModalHandler}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-lg font-bold text-center">Shopping Cart</p>
            <CartPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
