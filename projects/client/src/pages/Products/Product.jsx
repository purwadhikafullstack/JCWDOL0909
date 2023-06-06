import React from "react";
import ProductPage from "./ProductCard";
import CartPage from "../Cart/Cart";

const Products = () => {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-start-2 col-span-4">
        <ProductPage />
      </div>
      <div className="col-end-7 col-span-1">
        <CartPage />
      </div>
    </div>
  );
};

export default Products;
