import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../img/logogrocery.png";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

function BeforeLoginNavbar() {
  const userGlobal = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="flex items-center relative justify-between bg-slate-300 px-5 py-2 w-full">
        <div>
          <div>
            <img src={logo} alt="Logo" className="w-20 h-14 ml-5" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="flex items-center px-4 py-2 text-xs md:text-base text-blue-100 bg-slate-800 hover:bg-sky-800 rounded-md transition-colors duration-300 md:mr-2 md:mb-0"
            onClick={() => {
              navigate("/user/register");
            }}
          >
            <FaUserPlus className="mr-2" />
            Register
          </button>
          <button
            className="flex items-center px-4 py-2 text-xs md:text-base text-white bg-gray-500 hover:bg-gray-600 rounded-md transition-colors duration-300"
            onClick={() => {
              navigate("/user/login");
            }}
          >
            <FaSignInAlt className="mr-2" />
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}

export default BeforeLoginNavbar;
