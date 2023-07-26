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
      navigate("/");
    }
  }, [userGlobal, navigate]);

  return (
    <div className="py-6 mt-20">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://www.cubeoneapp.com/blog/wp-content/uploads/2023/04/oneapp-Buy-summer-vegetables-online-with-oneapp.png')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-3">
            Egrocery web App
          </h2>
          <p className="text-xl text-gray-600 text-center">
            Create your new account
          </p>

          <RegisterForm handleRegisterUser={handleRegisterUser} />
        </div>
      </div>
    </div>
  );
}

export default Login;
