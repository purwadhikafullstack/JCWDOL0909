import React from "react";

function AddressItem({
  address,
  handleSetMainAddress,
  handleAddressClick,
  handleDeleteAddress,
}) {
  return (
    <div key={address.id_address}>
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-2 justify-start">
          <div className="text-base">{address.name}</div>
          <div>{`(+62) ${address.phone_number.substring(1)}`}</div>
        </div>
        <button
          onClick={() => handleSetMainAddress(address.id_address)}
          className="px-4 py-2 bg-white hover:bg-sky-700 hover:text-white text-slate-600 border-2 rounded-md transition duration-300"
        >
          Set as Main Address
        </button>
      </div>
      <div className="py-2">
        <div className="text-sm mb-2">{address.address}</div>
        <div className="text-sm">
          {address.city.toUpperCase()}, {address.province.toUpperCase()},{" "}
          {address.postal_code}
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-4 mb-4">
        <button
          onClick={() => handleAddressClick(address.id_address)}
          className="px-5 py-2 hover:bg-yellow-400 bg-blue-900  text-white rounded-md transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteAddress(address.id_address)}
          className="px-5 py-2 hover:bg-yellow-400 bg-blue-900 text-white rounded-md transition duration-300"
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  );
}

export default AddressItem;
