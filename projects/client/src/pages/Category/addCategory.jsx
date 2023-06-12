import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const userToken = localStorage.getItem("user_token");

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
  });

  const addCategory = () => {
    axios
      .post(
        "http://localhost:8000/category",
        {
          categoryName: category.name,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )

      .then((response) => {
        console.log(response.data);
        Swal.fire(response.data.message, "success");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: "category already exist!",
        });
      });
  };

  return (
    <div className="bg-sky-700 h-screen">
      <div className="container mx-auto pt-52 py-12">
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block mb-2 text-md text-white font-bold dark:text-white"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={category.categoryName}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="button"
            onClick={addCategory}
            className="bg-[#EDA415] hover:bg-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
