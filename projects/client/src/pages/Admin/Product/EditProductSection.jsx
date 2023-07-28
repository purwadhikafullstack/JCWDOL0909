import React from "react";

function EditProductSection({
  handleSubmit,
  name,
  setName,
  price,
  setPrice,
  stock,
  setStock,
  category,
  setCategory,
  description,
  setDescription,
  categories,
  product,
  previewImage,
  handleImageChange,
}) {
  return (
    <section className="p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-black">Edit product</h2>
        <form onSubmit={handleSubmit}>
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
                value={name || (product && product.name) || ""}
                onChange={(event) => setName(event.target.value)}
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
                value={price || (product && product.price) || ""}
                onChange={(event) => setPrice(event.target.value)}
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
                value={stock || (product && product.stock) || ""}
                onChange={(event) => setStock(event.target.value)}
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
                value={category || (product && product.id_category) || ""}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="">{product && product.category_name}</option>
                {categories.map((category) => (
                  <option
                    key={category.id_category}
                    value={category.id_category.toString()}
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
                value={description || (product && product.description) || ""}
                onChange={(event) => setDescription(event.target.value)}
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
              />
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Product Preview"
                  className="mt-2 h-40 w-auto object-contain"
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_API_IMG_URL}/${product && product.image}`}
                  alt="Product Preview"
                  className="mt-2 h-40 w-auto object-contain"
                />
              )}
            </div>
          </div>
          <div className="mt-8 text-right sm:mt-6">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 hover:text-black border border-transparent text-sm font-medium rounded-md text-black bg-[#EDA415] hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditProductSection;
