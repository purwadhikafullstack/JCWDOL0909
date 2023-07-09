import React from "react";
import ProductPage from "./ProductCard";

const Products = () => {
  return (
    <div className="grid grid-cols-6 gap-4 bg-sky-800 h-full">
      <div className="col-start-1 col-span-6  lg:mx-32 sm:mx-5">
        <ProductPage />
      </div>
    </div>
  );
};

export default Products;
