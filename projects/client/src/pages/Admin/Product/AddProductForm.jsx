import React from "react";
import ProductTab from "../../../components/ProductTab";
import AddProduct from "../../Products/addProduct";
import AdminLayout from "../../../components/AdminLayout";

function AddProductForm() {
  return (
    <AdminLayout>
      <div>
        <ProductTab />
      </div>
      <div>
        <AddProduct />
      </div>
    </AdminLayout>
  );
}

export default AddProductForm;
