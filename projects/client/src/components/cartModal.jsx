import React from "react";
import CartPage from "../pages/Cart/Cart";

const CartModal = ({ closeModal }) => {
  const closeModalHandler = () => {
    closeModal();
  };

  return (
    <div>
      <div className="fixed z-10 inset-0">
        <div className="flex items-center justify-end mt-20">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            <CartPage />
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModalHandler}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
