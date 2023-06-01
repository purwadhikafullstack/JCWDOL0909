import React, { useState, useEffect } from "react";
import Axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const userToken = localStorage.getItem("user_token");

  const HandleSubmit = async (event) => {
    event.preventDefault();
    console.log(category);

    const formData = new FormData();
    formData.append("productName", name);
    formData.append("productPrice", price);
    formData.append("productDesc", description);
    formData.append("file", image);
    formData.append("id_category", category);

    try {
      const response = await Axios.post(
        "http://localhost:8001/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    Axios.get("http://localhost:8001/category")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <form onSubmit={HandleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label
          htmlFor="productName"
          className="block text-gray-700 font-bold mb-2"
        >
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          id="productName"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter product name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="productPrice"
          className="block text-gray-700 font-bold mb-2"
        >
          Product Price
        </label>
        <input
          type="number"
          name="productPrice"
          id="productPrice"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter product price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="productDescription"
          className="block text-gray-700 font-bold mb-2"
        >
          Product Description
        </label>
        <textarea
          name="productDescription"
          id="productDescription"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter product description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="productImg"
          className="block text-gray-700 font-bold mb-2"
        >
          Product Image
        </label>
        <input
          type="file"
          name="productImg"
          id="productImg"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id_category} value={category.id_category}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
