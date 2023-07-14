import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function ProductForm() {
  const [products, setProducts] = useState([]);
  const admin = useSelector((state) => state.admins.admin);
  const adminToken = localStorage.getItem("admin_token");
  const navigate = useNavigate();

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This Product will be deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const response = await Axios.delete(
          `http://localhost:8000/admin/deleteProduct/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        fetchProductDataById();
        if (!response.data.success) {
          Swal.fire(response.data);
        } else {
          Swal.fire("Success", response.data.message, "success");
        }
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  useEffect(() => {
    fetchProductDataById();
  }, []);

  const fetchProductDataById = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/admin/getProduct/${admin.id_branch}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderList = () => {
    if (products.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-4 text-center">
            There's no product, please add first.
          </td>
        </tr>
      );
    }

    return products.map((product) => (
      <tr
        key={product.id_product}
        className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 lg:text-lg"
      >
        <td className="px-6 py-4 text-white">{product.id_product}</td>
        <td className="px-6 py-4 text-white ">
          <img
            className="w-40 h-32 object-cover"
            src={`http://localhost:8000/${product.image}`}
            alt="Product Image"
          />
        </td>

        <td className="px-6 py-4 text-white">{product.name}</td>
        <td className="px-6 py-4 text-white">{product.price}</td>
        <td className="px-6 py-4 text-white">{product.stock}</td>

        <td className="flex items-center px-6 py-14 space-x-3">
          <button
            className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
            onClick={() => {
              navigate(`/admin/edit-product/${product.id_product}`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5```jsx
m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="ml-2">Edit</span>
          </button>

          <button
            className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white"
            onClick={() => handleDeleteProduct(product.id_product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="ml-2">Delete</span>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="overflow-x-auto p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Id
              </th>
              <th scope="col" className="px-20 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-24 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderList()}</tbody>
        </table>
      </div>
    </>
  );
}

export default ProductForm;
