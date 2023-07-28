import React from "react";
import ProductPage from "./ProductCard";

const Products = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:w-full mr-4">
      <div className="col-start-1 col-span-6">
        <ProductPage />
      </div>
    </div>
  );
};

export default Products;
