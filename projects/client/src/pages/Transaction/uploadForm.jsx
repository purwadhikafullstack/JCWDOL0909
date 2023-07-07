import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { idTransaction } = useParams(); // Mendapatkan nilai id_transaction dari parameter URL
  const userToken = localStorage.getItem("user_token");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];

    setFile(selectedFile);
    setError(null);

    // Baca file menggunakan FileReader
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `http://localhost:8000/payments/addPayment?id_transaction=${idTransaction}`, // Gunakan id_transaction dari useParams
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        console.log(response.data); // Outputkan respon dari backend jika diperlukan

        if (!response.data.success) {
          Swal.fire("Error", response.data.message, "error");
        } else {
          Swal.fire("Success", response.data.message, "success");
        }
        navigate("/user/orderlist");
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    } else {
      Swal.fire("Tidak ada file yang dipilih");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen mt-16">
      <h1 className="text-base font-bold mb-6 text-center">
        Upload your payment proof here
      </h1>
      <div className="bg-white shadow-lg rounded p-8 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 border-t border-slate-200 my-8 justify-center">
        <div className="mx-auto flex items-center justify-center mb-10 border-red-500 w-80 h-96">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 rounded-none"
          >
            <div className="flex flex-col items-center h-full justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-h-96 w-96" />
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-5 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
              )}
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Format file must be PNG or JPG (MAX. 1 MB)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="px-4 py-2 bg-white hover:bg-sky-700 hover:text-white text-slate-600 border-2 rounded-md transition duration-300"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadForm;
