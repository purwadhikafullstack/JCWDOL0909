import React from "react";
import CategoryTab from "../../../components/CategoryTab";
import AddCategory from "../../Category/addCategory";
import AdminLayout from "../../../components/AdminLayout";

function AddCategoryForm() {
  return (
    <AdminLayout>
      <div>
        <CategoryTab />
      </div>
    </AdminLayout>
  );
}

export default AddCategoryForm;
