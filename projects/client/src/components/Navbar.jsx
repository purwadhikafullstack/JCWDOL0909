import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../features/users/userSlice";
import { resetCart } from "../features/cart/cartSlice";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaCube, FaUser, FaShoppingBag, FaCogs } from "react-icons/fa";
import Swal from "sweetalert2";
import logoo from "../img/logo-cut.png";
import carts from "../img/shopping-cart.png";
import CartModal from "./cartModal";

function Navbar() {
  const userGlobal = useSelector((state) => state.users.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user_token");
        dispatch(resetUser());
        dispatch(resetCart());
        Swal.fire(
          "Logged Out!",
          "You have been successfully logged out.",
          "success"
        ).then(() => {
          navigate("/user/login");
        });
      }
    });
  };

  return (
    <div>
      <nav className="flex items-center relative justify-between w-screen bg-slate-300 px-5 py-2">
        <div>
          <div>
            <img src={logoo} alt="Logo" className="w-20 h-16 ml-5" />
          </div>
        </div>
        <ul
          id="drawer"
          role="menu"
          className="sm:gap-3 transition-left ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] delay-150  sm:flex  flex flex-col cursor-pointer absolute min-h-screen -left-48 sm:static w-48 top-0 bg-white sm:shadow-none shadow-xl sm:bg-transparent sm:flex-row sm:w-auto sm:min-h-0 dark:bg-slate-900  "
        >
          <li className="font-medium text-lg p-3 mr-5 text-black hover:text-white hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-primary">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="dark:text-white"
            >
              <FaHome className="inline-block align-middle mr-2" />
              Home
            </button>
          </li>
          <li className="font-medium text-lg p-3 mr-5 text-black hover:text-white cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent  hover:text-primary transition-colors">
            <button
              onClick={() => {
                navigate("/product");
              }}
              className="dark:text-white"
            >
              <FaCube className="inline-block align-middle mr-2" />
              Product
            </button>
          </li>
          <li className="font-medium text-lg p-1 mr-5 text-black hover:text-white cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent  hover:text-primary transition-colors">
            <button
              onClick={() => {
                navigate("/user/orderlist");
              }}
              className="dark:text-white"
            >
              <FaShoppingBag className="inline-block align-middle mr-2" />
              My Order
            </button>
          </li>
        </ul>
        <div className="flex gap-3 items-center text-red-500">
          <button onClick={openCart}>
            <img src={carts} alt="Shopping Cart" />
          </button>
          {showCart && <CartModal closeModal={closeCart} />}

          <div className="relative mr-5">
            <>
              {userGlobal.imagePath ? (
                <img
                  src={`http://localhost:8000/${userGlobal.imagePath}`}
                  alt=""
                  className="w-8 h-8 rounded-full"
                  onClick={toggleDropdown}
                />
              ) : (
                <div>
                  <div
                    className="h-8 w-8 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://i.pinimg.com/474x/c6/e9/ed/c6e9ed167165ca99c4d428426e256fae.jpg')]"
                    onClick={toggleDropdown}
                  ></div>
                </div>
              )}
            </>
            {isOpen && (
              <div className="userDropdown w-28 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3">
                <ul>
                  <li className="pl-4 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                    <button
                      onClick={() => {
                        navigate("/user/profile");
                      }}
                    >
                      <FaUser className="inline-block align-middle mr-3.5" />
                      Profile
                    </button>
                  </li>
                  <li className="pl-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400 mr-1">
                    <FaCogs className="inline-block align-middle mr-2.5" />

                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="sm:hidden cursor-pointer" id="mobile-toggle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                className="dark:stroke-white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
