import React, { useState, useEffect } from "react";
import address from "../../img/address.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import MainAddress from "./mainAddress";
import AddressForm from "./addAddress";
import Swal from "sweetalert2";
import { fetchMainAddressData } from "./helperMainAddress";
import AddressItem from "./addressItem";

function Address() {
  const userGlobal = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const [addressList, setAddressList] = useState([]);
  const userToken = localStorage.getItem("user_token");
  const [showModal, setShowModal] = useState(false);
  const [mainAddress, setMainAddress] = useState([]);

  useEffect(() => {
    const mainFunc = async () => {
      await fetchAddressData();
    };
    mainFunc();
  }, []);

  const fetchAddressData = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/fetchAddress`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setMainAddress(await fetchMainAddressData());
      setAddressList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this address.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        const response = await Axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/address/deleteAddress?id_address=${addressId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        fetchAddressData();
        if (!response.data.success) {
          Swal.fire(response.data.message);
        } else {
          Swal.fire("Success", response.data.message, "success");
        }
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleSetMainAddress = async (addressId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to set this address as the main address.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, set it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        const response = await Axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/address/setMainAddress?id_address=${addressId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        fetchAddressData();
        if (!response.data.success) {
          Swal.fire(response.data.message);
        } else {
          Swal.fire("Success", response.data.message, "success");
        }
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleAddressClick = async (addressId) => {
    navigate(`/address/${addressId}`);
  };

  return (
    <div>
      <section className="p-6 mx-3 bg-white border-2 rounded-md shadow-md mt-4">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ml-4">
          My Address
        </h2>
        <div className="bg-white border-2 justify-center rounded-md shadow-md p-6 mx-3 mt-4">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="px-4 py-2 w-44 bg-white hover:bg-sky-700 hover:text-white text-slate-600 border-2 rounded-md transition duration-300"
            >
              Add a new address
            </button>
          </div>

          {mainAddress.length > 0 ? (
            <div>
              <MainAddress addressList={mainAddress} />
              {addressList.map((address) => (
                <AddressItem
                  key={address.id_address}
                  address={address}
                  handleSetMainAddress={handleSetMainAddress}
                  handleAddressClick={handleAddressClick}
                  handleDeleteAddress={handleDeleteAddress}
                />
              ))}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center mt-20">
                <img
                  src={address}
                  alt="Address"
                  className="w-52 h-40 text-gray-600 mb-4"
                />
              </div>
              <div className="text-gray-700 text-center mb-32">
                You don't have any address
              </div>
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <AddressForm
            closeModal={handleCloseModal}
            fetchAddressData={fetchAddressData}
          />
          {/* Passing prop handleCloseModal */}
        </div>
      )}
    </div>
  );
}

export default Address;
