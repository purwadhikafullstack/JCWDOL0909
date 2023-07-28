import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email cannot be empty")
    .email("Wrong email format"),
  password: Yup.string()
    .required("Password cannot be empty")
    .min(3, "Password too short"),
  phoneNumber: Yup.string()
    .matches(/^(?:\+62|0)[2-9]{1}[0-9]{7,11}$/, "invalid phone number")
    .required("phone number cannot be empty"),
});
const registerUser = async (value) => {
  let response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, value);
};

function RegisterForm({ handleRegisterUser }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={{ email: "", password: "", phoneNumber: "" }}
        validationSchema={registerSchema}
        onSubmit={handleRegisterUser}
      >
        {(props) => (
          <Form className="mt-8 flex flex-col w-full md:w-80">
            <div className="mb-5">
              <Field
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                className="text-xl w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                placeholder="Email-address"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs text-left text-red-500 mb-2"
              />
            </div>

            <div className="mb-5">
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                className="text-xl w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-left text-red-500 mb-2"
              />
            </div>
            <div className="mb-5">
              <Field
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                autoComplete="phoneNumber"
                className="text-xl w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                placeholder="Phone Number"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-xs text-left text-red-500 mb-2"
              />
            </div>
            <button
              type="submit"
              className="text-xl text-center bg-slate-400 text-white py-1 rounded font-medium hover:bg-[#003F62]"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
      <div className="flex justify-evenly space-x-2 w-64 mt-4">
        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
        <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
          or
        </span>
        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
      </div>
      <button className="mt-4 flex">
        <div className="bg-no-repeat facebook-logo mr-1"></div>
        <span
          className="text-xs text-blue-900 font-semibold hover:text-blue-400"
          onClick={() => {
            navigate("/user/login");
          }}
        >
          already have an account? login here
        </span>
      </button>
    </div>
  );
}

export default RegisterForm;
