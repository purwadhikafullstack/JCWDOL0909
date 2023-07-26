import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MainAddress({ addressList }) {
  const navigate = useNavigate();

  const handleDeleteAddress = () => {
    Swal.fire("You can't delete the main address!");
  };

  const handleAddressClick = async (addressId) => {
    navigate(`/address/${addressId}`);
  };

  return (
    <div>
      {addressList.map((address) => (
        <div key={address.id_address}>
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 justify-start">
              <div className="text-base">{address.name}</div>
              <div>{`(+62) ${address.phone_number.substring(1)}`}</div>
            </div>
          </div>
          <div className="py-2">
            <div className="text-sm mb-2">{address.address}</div>
            <div className="text-sm">
              {address.city.toUpperCase()}, {address.province.toUpperCase()},{" "}
              {address.postal_code}
            </div>
          </div>
          <div className="text-base text-blue-500 border  font-semibold w-44 py-2 pl-8">
            Main Address
          </div>
          <div className="flex items-center space-x-2 mt-4 mb-4">
            <button
              onClick={() => handleAddressClick(address.id_address)}
              className="px-5 py-2 hover:bg-yellow-400 bg-blue-900 text-white rounded-md transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteAddress}
              className="px-5 py-2 bg-blue-900 text-white rounded-md transition duration-300"
            >
              Delete
            </button>
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default MainAddress;
