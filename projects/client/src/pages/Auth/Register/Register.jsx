import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../features/users/userSlice";
import RegisterForm from "./RegisterForm";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.users.user);

  const handleRegisterUser = async (value) => {
    dispatch(registerUser(value));
  };

  useEffect(() => {
    if (userGlobal.id > 0) {
      navigate("/product");
    }
  }, [userGlobal, navigate]);

  return (
    <div class="flex h-screen bg-[#003F62]">
      <div class="m-auto">
        <div class="p-8 shadow-lg rounded-xl text-center bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline text-[#003F62] h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h1 class="text-3xl font-bold text-[#EDA415] pb-10">Register</h1>
          <h3 class="text-1xl font-semibold text-gray-500 pb-5">
            Create your new account
          </h3>

          <RegisterForm handleRegisterUser={handleRegisterUser} />
        </div>
      </div>
    </div>
  );
}

export default Login;
