import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email cannot be empty")
    .email("Wrong email format"),
  password: Yup.string()
    .required("Password cannot be empty")
    .min(3, "Password too short"),
});

function LoginAdminForm({ handleLoginAdmin }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLoginAdmin}
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
                autoComplete="currennt-password"
                className="text-xl w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-left text-red-500 mb-2"
              />
            </div>
            <button
              type="submit"
              className="text-xl text-center bg-[#EDA415] text-white py-1 rounded font-medium hover:bg-[#003F62]"
            >
              Sign In
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
            navigate("/user/register");
          }}
        >
          don't have an account? register here
        </span>
      </button>
      <p className="text-xs text-blue-900 mt-4 cursor-pointer -mb-4 hover:text-blue-400">
        Forgot password?
      </p>
    </div>
  );
}

export default LoginAdminForm;
