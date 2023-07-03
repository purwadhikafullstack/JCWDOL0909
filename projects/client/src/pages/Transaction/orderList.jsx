import React from "react";

function OrderList() {
  return (
    <div className="max-w-7xl mx-auto bg-white shadow-2xl p-8 mt-8">
      <div className="mb-8">
        <h3 className="text-base font-semibold mb-2">Tracking number</h3>
        <p className="text-gray-600">51547878755545848512</p>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Items</h3>
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
        <div className="flex items-center mb-4">
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
      <div className="mb-0">
        <div className="flex justify-between mb-2">
          <h3 className="text-base font-semibold">Subtotal</h3>
          <p className="font-semibold">$72.00</p>
        </div>
        <div className="flex justify-between mb-2">
          <h3 className="text-base font-semibold">Shipping</h3>
          <p className="font-semibold">$8.00</p>
        </div>
        <div className="flex justify-between mb-2">
          <h3 className="text-base font-semibold">Taxes</h3>
          <p className="font-semibold">$6.40</p>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <h3 className="text-base font-semibold">Total</h3>
          <p className="text-base font-semibold">$86.40</p>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
