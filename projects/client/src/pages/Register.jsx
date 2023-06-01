import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";

function Register() {
  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username cannot be empty"),
    email: Yup.string()
      .required("Email cannot be empty")
      .email("Wrong email format"),
    phone: Yup.string().required("phone cannot be empty"),
    store_name: Yup.string().required("store Name cannot be empty"),
    password: Yup.string()
      .required("Password cannot be empty")
      .min(3, "Password to short"),
  });

  const registerUser = async (value) => {
    let response = await Axios.post("http://localhost:8001/auth/", value);
    console.log(response);
  };

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          phone: "",
          store_name: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(value) => {
          registerUser(value);
        }}
      >
        {(props) => {
          return (
            <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Register your account
                  </h2>
                </div>
                <Form className="mt-8 space-y-6" action="#" method="POST">
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="username" className="sr-only">
                        Username
                      </label>
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Username"
                      />
                      <ErrorMessage
                        component="div"
                        name="username"
                        style={{ color: "red", fontSize: "12px" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <Field
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Email address"
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        style={{ color: "red", fontSize: "12px" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="sr-only">
                        phone
                      </label>
                      <Field
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="phone"
                        required
                        className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="phone"
                      />
                      <ErrorMessage
                        component="div"
                        name="phone"
                        style={{ color: "red", fontSize: "12px" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="store_name" className="sr-only">
                        Store Name
                      </label>
                      <Field
                        id="storename"
                        name="storename"
                        type="text"
                        autoComplete="storename"
                        required
                        className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="store name"
                      />
                      <ErrorMessage
                        component="div"
                        name="storename"
                        style={{ color: "red", fontSize: "12px" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        component="div"
                        name="password"
                        style={{ color: "red", fontSize: "12px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      register
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
