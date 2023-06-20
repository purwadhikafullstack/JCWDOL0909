import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await Axios.get(
          `http://localhost:8000/products/${id}`
        );
        const selectedProduct = productResponse.data;
        setProduct(selectedProduct);

        const adminResponse = await Axios.get(
          `http://localhost:8000/auth/user/${selectedProduct.id_admin}`
        );
        const adminData = adminResponse.data;
        setAdminData(adminData[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = (product) => {
    // Logika untuk menambahkan produk ke keranjang
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-sky-800 overflow-hidden shadow-md p-4 h-screen px-10 ">
        {product.product_image && (
          <img
            src={`http://localhost:8000/${product.product_image}`}
            className="w-96 h-72 object-cover mb-4 rounded-md"
            alt={product.product_name}
          />
        )}
        <h3 className="text-xl font-semibold text-white mb-2">
          {product.product_name}
        </h3>
        <p className="text-white mb-2">
          {product.product_price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>

        <p className="text-[#EDA415] mb-2 ">Stock: {product.product_stock}</p>

        <p className="text-white mb-4 text-justify">
          {product.product_description}
        </p>

        <div className="flex items-center">
          {adminData && adminData.user_profile_picture ? (
            <img
              src={adminData.user_profile_picture}
              alt="Avatar Admin"
              className="w-10 h-10 rounded-full mr-2 bg-white"
            />
          ) : (
            <div className="w-10 h-10 overflow-hidden bg-white rounded-full">
              <svg
                className="w-12 h-12 text-white-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          )}

          {adminData && (
            <div className="text-[#EDA415] ml-3 my-7">
              {adminData.user_name}
            </div>
          )}
        </div>
        <button
          className="bg-[#EDA415] hover:bg-orange-300 text-white py-1 px-6 mr-10 rounded-md"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
