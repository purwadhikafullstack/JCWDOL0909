import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuantity } from "../../features/cart/cartSlice";
import { handleAddToCart } from "./handleProduct";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.users.user);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await Axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/products/${id}`
        );
        const selectedProduct = productResponse.data;
        setProduct(selectedProduct);

        const adminResponse = await Axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/auth/user/${selectedProduct.id_admin}`
        );
        const adminData = adminResponse.data;
        setAdminData(adminData[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCartClick = (product) => {
    handleAddToCart(
      navigate,
      product,
      userGlobal,
      cartItems,
      dispatch,
      addItem,
      increaseQuantity
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen mx-auto lg:w-full">
      <div className="bg-white shadow-md rounded-lg p-8 lg:w-4/5 border-t-2">
        <div className="flex">
          <div className="w-1/2">
            <img
              src={`${process.env.REACT_APP_API_IMG_URL}/${product.image}`}
              alt="Back angled view with bag open and handles to the side."
              className="w-full"
            />
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <section aria-labelledby="information-heading">
              <h3 id="information-heading" className="mb-2">
                Product information
              </h3>
              <p className="mb-2">
                {product.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </section>
            <div className="mb-4">
              <h4 className="mb-1">Description</h4>
              <p className="text-justify">{product.description}</p>
            </div>
            <div className="flex items-center">
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
              {adminData && (
                <div className="ml-3">
                  <div className="text-[#EDA415]">{adminData.name}</div>
                  <div className="text-[#EDA415]">{adminData.profile}</div>
                </div>
              )}
            </div>
            <div className="mt-10">
              <button
                onClick={() => handleAddToCartClick(product)}
                type="submit"
                className="bg-blue-700 hover:bg-yellow-400 text-white py-2 px-4 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
