import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../features/users/userSlice";

function Navbar() {
  const userGlobal = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="container flex justify-around py-8 mx-auto bg-white">
      <div className="flex items-center">
        <h3 className="text-2xl font-medium text-blue-500">Cashier 6</h3>
      </div>

      {userGlobal.id > 0 ? (
        <div className=" bg-white flex items-center h-16 gap-8">
          <button
            onClick={() => {
              localStorage.removeItem("user_token");
              dispatch(resetUser());
              alert("Logout Berhasil");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-2">
            <button
              className="px-4 py-2 text-blue-100 bg-blue-800 rounded-md"
              onClick={() => {
                navigate("/user/register");
              }}
            >
              Register
            </button>
            <button
              className="px-4 py-2 text-gray-200 bg-gray-400 rounded-md"
              onClick={() => {
                navigate("/user/login");
              }}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
