import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Swal from "sweetalert2";

const CreateAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const userToken = localStorage.getItem("user_token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(branch);

    const requestData = {
      adminEmail: email,
      adminName: name,
      id_branches: branch,
    };

    try {
      const response = await Axios.post(
        "http://localhost:8000/admin/createAdmin",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        Swal.fire(response.data.message);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire(error.message);
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/admin/branch")
      .then((response) => {
        console.log(response.data);
        setBranches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setEmail("");
      setBranch("");
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <section className="bg-white w-full">
          <div className="py-4 px-4 mx-auto mt-20 max-w-2xl lg:py-16 border-2 rounded-lg">
            <h2 className="mb-4 text-xl font-bold text-black">
              Add branch admin
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Admin Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type admin email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type admin name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Branch
                  </label>
                  <select
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={branch}
                    onChange={(event) => setBranch(event.target.value)}
                    required
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id_branch} value={branch.id_branch}>
                        {branch.location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-8 text-right sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 hover:text-black border border-transparent text-sm font-medium rounded-md text-black bg-[#EDA415] hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreateAdmin;
