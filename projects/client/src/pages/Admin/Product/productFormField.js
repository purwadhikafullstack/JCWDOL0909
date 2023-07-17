import React from "react";

function ProductFormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  previewImage,
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-black"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows="4"
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {previewImage ? (
        <img
          src={previewImage}
          alt="Product Preview"
          className="mt-2 h-40 w-auto object-contain"
        />
      ) : null}
    </div>
  );
}

export default ProductFormField;
