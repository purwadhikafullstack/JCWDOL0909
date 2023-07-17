import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category Name is required"),
});

function AddCategory() {
  const addCategory = (values, { resetForm }) => {
    const adminToken = localStorage.getItem("admin_token");
    Axios.post(
      "http://localhost:8000/admin/addCategory",
      {
        categoryName: values.categoryName,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        Swal.fire(response.data.message);
        resetForm(); // Reset the form after successful submission
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: "Category already exists!",
        });
      });
  };

  return (
    <section className="p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
      <div>
        <div className="container mx-auto pt-52 py-12">
          <Formik
            initialValues={{ categoryName: "" }}
            validationSchema={validationSchema}
            onSubmit={addCategory}
          >
            <Form className="max-w-md mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="categoryName"
                  className="block mb-2 text-md text-black font-bold"
                >
                  Category Name
                </label>
                <Field
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="categoryName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-[#EDA415] hover:bg-red-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Category
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default AddCategory;
