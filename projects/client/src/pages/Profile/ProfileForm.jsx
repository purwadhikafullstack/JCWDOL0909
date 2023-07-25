import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editProfile, setUser } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import UpdateProfile from "./ProfilePicture";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    name: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Please select a gender")
      .required("Required"),
    birthday: Yup.date()
      .max(
        moment().subtract(10, "years").format("YYYY-MM-DD"),
        "Must be at least 10 years old"
      )
      .required("Required"),
  });

  const handleEditProfile = async (values) => {
    const formattedValues = {
      id: user.id,
      imagePath: user.imagePath,
      ...values,
      birthday: moment(values.birthday).format("YYYY-MM-DD"),
    };

    setIsSaving(true);
    await dispatch(editProfile(formattedValues));
    dispatch(setUser(formattedValues));
    setIsSaving(false);
  };

  return (
    <section className="p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-4">
      <h1 className="text-xl font-bold text-black capitalize">User Profile</h1>
      <Formik
        initialValues={{
          email: user.email,
          name: user.name || "",
          phoneNumber: user.phoneNumber || "",
          gender: user.gender || "",
          birthday: user.birthday
            ? moment(user.birthday).format("YYYY-MM-DD")
            : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleEditProfile}
      >
        {({ isSubmitting }) => (
          <Form>
            <UpdateProfile />
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1 mx">
              <div>
                <label htmlFor="email" className="text-black">
                  Email Address
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="name" className="text-black">
                  Full Name
                </label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="text-black">
                  Phone Number
                </label>
                <Field
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <span className="text-black">Gender</span>
                <div className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:outline-none focus:ring">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      className="form-radio"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      className="form-radio"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="birthday" className="text-black">
                  Date
                </label>
                <Field
                  id="birthday"
                  type="date"
                  name="birthday"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="birthday"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isSubmitting || isSaving}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ProfileForm;
