import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password cannot be empty")
    .min(3, "Password too short"),
  confirmPassword: Yup.string()
    .required("Password cannot be empty")
    .min(3, "Password too short")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

function ChangePasswordForm({ handleChangePassword }) {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    handleChangePassword(values);
    setSubmitting(false);
    resetForm();
  };
  return (
    <>
      <section className="p-6 mx-3 bg-white border-2 rounded-md shadow-md mt-4">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Password settings
        </h2>

        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={changePasswordSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
              <div>
                <label className="text-gray-700" htmlFor="email">
                  Old Password
                </label>
                <Field
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="newPassword">
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Save
              </button>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
}

export default ChangePasswordForm;
