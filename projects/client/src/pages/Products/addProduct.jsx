import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const adminToken = localStorage.getItem("admin_token");

  const HandleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("productName", name);
    formData.append("productPrice", price);
    formData.append("productStock", stock);
    formData.append("productDesc", description);
    formData.append("file", image);
    formData.append("id_category", category);

    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/addProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (!response.data.success) {
        Swal.fire(response.data.message);
      } else {
        Swal.fire("Success", response.data.message, "success");
      }
    } catch (error) {
      Swal.fire("Error", error.response.data.message, "error");
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_BASE_URL}/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-black">Add a new product</h2>
        <form onSubmit={HandleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-black"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type product name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-black"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="RP 10.000,00"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-black"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter product stock"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-black"
              >
                Category
              </label>
              <select
                name="category"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.id_category}
                    value={category.id_category}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-black"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none"
                placeholder="Type product description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-black"
              >
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
          <div className="mt-8 text-right sm:mt-6">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 hover:text-black border border-transparent text-sm font-medium rounded-md text-black bg-[#EDA415] hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
