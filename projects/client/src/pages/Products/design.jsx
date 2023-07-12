import React from "react";

function Design() {
  return (
    <div className="flex justify-center items-center h-screen mx-auto lg:w-3/4">
      <div className="bg-white shadow-md rounded-lg p-8 my-10">
        <div className="flex">
          <div className="w-1/3">
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg"
              alt="Back angled view with bag open and handles to the side."
              className="w-full"
            />
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-bold mb-2">Zip Tote Basket</h2>
            <section aria-labelledby="information-heading">
              <h3 id="information-heading" className="mb-2">
                Product information
              </h3>
              <p className="mb-2">$220</p>
            </section>
            <div className="mb-4">
              <h4 className="mb-1">Description</h4>
              <p className="text-justify">
                The Zip Tote Basket is the perfect midpoint between shopping
                tote and comfy backpack. With convertible straps, you can hand
                carry, shoulder sling, or backpack this convenient and spacious
                bag. The zip top and durable canvas construction keeps your
                goods protected for all-day use.
              </p>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Design;
