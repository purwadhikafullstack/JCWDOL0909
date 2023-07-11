import React, { useState } from "react";
import ProfileForm from "../pages/Profile/ProfileForm";
import Profile from "../pages/Profile/Profile";
import ChangePasswordForm from "../pages/Auth/ChangePassword/ChangePasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/users/userSlice";
import Address from "../pages/Profile/Address";

function Tab() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const dispatch = useDispatch();

  const handleChangePassword = async (value) => {
    dispatch(changePassword(value));
  };

  return (
    <>
      <section className=" p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-4">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">
              <a
                href="#"
                className={`inline-flex p-4 ${
                  activeTab === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                    : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                }`}
                aria-current={activeTab === "profile" ? "page" : undefined}
                onClick={() => handleTabClick("profile")}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Profile
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                className={`inline-flex p-4 ${
                  activeTab === "password"
                    ? "border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                    : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                }`}
                onClick={() => handleTabClick("password")}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                </svg>
                Password Settings
              </a>
            </li>
            <li class="mr-2">
              <button
                className={`inline-flex p-4 ${
                  activeTab === "Address"
                    ? "border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                    : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                }`}
                onClick={() => handleTabClick("Address")}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Address
              </button>
            </li>
          </ul>
        </div>
      </section>

      {/* Render different content based on activeTab */}
      {activeTab === "profile" && <ProfileForm />}
      {activeTab === "Address" && <Address />}
      {activeTab === "password" && (
        <ChangePasswordForm handleChangePassword={handleChangePassword} />
      )}
      {/* Render other pages for different tabs */}
    </>
  );
}
export default Tab;
