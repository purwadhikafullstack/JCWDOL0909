import React, { useState, useEffect } from "react";
import { fetchProvinces, fetchCities, fetchGeolocation } from "./fetchLocation";
import { saveAddress } from "./addressUtils";

function AddressForm({ closeModal, fetchAddressData }) {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [geolocation, setGeolocation] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const userToken = localStorage.getItem("user_token");

  const handleSaveAddress = () => {
    const selectedProvince = provinces.find(
      (province) => province.province_id === selectedProvinceId
    );
    const selectedCity = cities.find((city) => city.city_id === selectedCityId);
    const data = {
      name: fullName,
      phoneNumber,
      address: streetAddress,
      additionalDetails,
      postalCode,
      longitude: geolocation.longitude,
      latitude: geolocation.latitude,
      province: selectedProvince ? selectedProvince.province : "",
      city: selectedCity ? selectedCity.city_name : "",
    };
    saveAddress(data, userToken, fetchAddressData, closeModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provincesData = await fetchProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setSelectedProvinceId(provinceId);
    try {
      const citiesData = await fetchCities(provinceId);
      setCities(citiesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
    const selectedCity = cities.find((city) => city.city_id === cityId);
    if (selectedCity) {
      const { province, city_name } = selectedCity;
      try {
        const geolocationData = await fetchGeolocation(province, city_name);
        setGeolocation(geolocationData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSaveAddress();
  };
  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="flex flex-col items-center bg-white my-24">
      <div className="border border-gray-300 rounded-md p-8 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-2">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded-md w-full"
              autoComplete="name"
              maxLength="30"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="w-1/2 ml-2">
            <input
              type="number"
              placeholder="Phone Number"
              className="border border-gray-300 p-2 rounded-md w-full"
              autoComplete="user-address-phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 w-full max-w-md">
          <select
            id="province"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={selectedProvinceId}
            onChange={handleProvinceChange}
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province_id}>
                {province.province}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full max-w-md">
          <select
            id="city"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={selectedCityId}
            onChange={handleCityChange}
          >
            <option value="">Pilih Kota</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        {geolocation && (
          <div>
            <p>Latitude: {geolocation.latitude}</p>
            <p>Longitude: {geolocation.longitude}</p>
          </div>
        )}
        <div className="mb-4 w-full max-w-md">
          <input
            type="number"
            placeholder="Postal Code"
            className="border border-gray-300 p-2 rounded-md w-full"
            autoComplete="postal-code"
            maxLength="10"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <textarea
            rows="2"
            placeholder="Street Name, Building, House Number"
            className="border border-gray-300 p-2 rounded-md w-full"
            autoComplete="user-street-address"
            maxLength="160"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="text"
            placeholder="Other Details (e.g., Block/Unit No., Landmark)"
            className="border border-gray-300 p-2 rounded-md w-full"
            maxLength="20"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-sm mr-2 transition duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded-sm transition duration-300 ease-in-out hover:bg-yellow-600"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
