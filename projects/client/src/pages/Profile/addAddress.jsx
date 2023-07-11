import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddressForm({ closeModal }) {
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

  const handleSaveAddress = async () => {
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

    try {
      const response = await axios.post(
        "http://localhost:8000/address/addAddress",
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.data.success) {
        Swal.fire(response.data.message);
      } else {
        Swal.fire(response.data.message);
      }
    } catch (error) {
      Swal.fire(error.message);
      console.error(error.message);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/rajaongkir/province"
      );
      const provinces = response.data.rajaongkir.results;
      setProvinces(provinces);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/rajaongkir/city?provinceId=${provinceId}`
      );
      const cities = response.data.rajaongkir.results;
      setCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchGeolocation = async (cityId) => {
    try {
      const selectedCity = cities.find((city) => city.city_id === cityId);

      if (selectedCity) {
        const { province, city_name } = selectedCity;
        const url = `http://localhost:8000/opencage/geolocation/${province}/${city_name}`;

        const response = await axios.get(url);
        const location = response.data;
        setGeolocation(location);
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvinceId(provinceId);
    fetchCities(provinceId);
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
    fetchGeolocation(cityId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSaveAddress();
  };

  const handleCancel = () => {
    closeModal(); // Memanggil closeModal untuk menutup modal
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
              type="text"
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
            type="text"
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
