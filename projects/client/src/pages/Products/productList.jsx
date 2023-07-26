import React from "react";

function ProductList({ products, handleProductClick, handleAddToCart }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-1">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            className="bg-white shadow-lg overflow-hidden grid-cols-3 sm:grid-cols-2 h-auto"
            key={product.id_product}
          >
            <div className="relative flex flex-col overflow-hidden rounded-lg border">
              <img
                src={`${process.env.REACT_APP_API_IMG_URL}/${product.image}`}
                alt={product.name}
                className="w-full h-60 md:h-72 object-cover "
                onClick={() => handleProductClick(product)}
              />

              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                  <p className="mr-3 text-sm font-bold text-[#EDA415]">
                    {product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
                <p className="text-lg font-medium">{product.name}</p>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600"
              >
                <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-[#fcae14] group-hover:text-white">
                  Add
                </div>
                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                  +
                </div>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No products available.</div>
      )}
    </div>
  );
}

export default ProductList;
