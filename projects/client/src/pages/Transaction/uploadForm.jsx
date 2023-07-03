import React, { useState } from "react";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 1024 * 1024; // 1 MB

    if (
      selectedFile &&
      allowedTypes.includes(selectedFile.type) &&
      selectedFile.size <= maxSize
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError(
        "File harus dalam format JPG atau PNG dan memiliki ukuran maksimum 1 MB."
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      console.log("File yang diupload:", file);
      // Lakukan permintaan AJAX atau API ke server di sini untuk mengunggah file
    } else {
      console.log("Tidak ada file yang dipilih");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen mt-16">
      <h1 className="text-base font-bold mb-6 text-center">
        Upload your payment proof here
      </h1>
      <div className="bg-white shadow-lg rounded p-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 border-t border-slate-200 my-8">
        <div className="flex items-center justify-center mb-4 border-red-500">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 rounded-none"
          >
            <div className="flex flex-col items-center h-full justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
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
