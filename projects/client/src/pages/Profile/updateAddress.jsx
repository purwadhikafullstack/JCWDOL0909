import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

function UpdateAddress({ editAddressData }) {
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [geolocation, setGeolocation] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const userToken = localStorage.getItem("user_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const addressResponse = await Axios.get(
          `http://localhost:8000/address/fetchAddressById?idAddress=${id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const address = addressResponse.data;
        setAddress(address[0]);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };

    fetchAddressData();
  }, [id]);

  useEffect(() => {
    if (editAddressData) {
      setFullName(editAddressData.name);
      setPhoneNumber(editAddressData.phoneNumber);
      setStreetAddress(editAddressData.address);
      setAdditionalDetails(editAddressData.additionalDetails);
      setPostalCode(editAddressData.postalCode);
      setSelectedProvinceId(editAddressData.selectedProvinceId);
      setSelectedCityId(editAddressData.selectedCityId);
    }
  }, [editAddressData]);

  const handleEditAddress = async () => {
    const selectedProvince = provinces.find(
      (province) => province.province_id === selectedProvinceId
    );
    const selectedCity = cities.find((city) => city.city_id === selectedCityId);
    const data = {
      name: fullName || (address && address.name) || "",
      phoneNumber: phoneNumber || (address && address.phone_number) || "",
      address: streetAddress || (address && address.address) || "",
      additionalDetails:
        additionalDetails || (address && address.additional_details) || "",
      postalCode: postalCode || (address && address.postal_code) || "",
      longitude: geolocation?.longitude || (address && address.longitude) || "",
      latitude: geolocation?.latitude || (address && address.latitude) || "",
      province:
        selectedProvince && selectedProvince.province
          ? selectedProvince.province
          : address.province,
      city:
        selectedCity && selectedCity.city_name
          ? selectedCity.city_name
          : address.city,
    };

    if (geolocation) {
      data.longitude = geolocation?.longitude;
      data.latitude = geolocation?.latitude;
    }

    try {
      const response = await Axios.patch(
        `http://localhost:8000/address/editAddress?id_address=${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.data.success) {
        Swal.fire(response.data.message);
        navigate("/user/profile");
      } else {
        Swal.fire("success", response.data.message, "success");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/rajaongkir/province"
      );
      const provinces = response.data.rajaongkir.results;
      setProvinces(provinces);
    } catch (error) {
      console.log("Error fetching provinces:", error);
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/rajaongkir/city?provinceId=${provinceId}`
      );
      const cities = response.data.rajaongkir.results;
      setCities(cities);
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  const fetchGeolocation = async (cityId) => {
    try {
      const selectedCity = cities.find((city) => city.city_id === cityId);

      if (selectedCity) {
        const { province, city_name } = selectedCity;
        const url = `http://localhost:8000/opencage/geolocation/${province}/${city_name}`;

        const response = await Axios.get(url);
        const location = response.data;
        setGeolocation(location);
      }
    } catch (error) {
      console.log("Error fetching geolocation:", error);
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

    handleEditAddress();
  };

  return (
    <div className="flex flex-col items-center my-24">
      <div className="border border-gray-300 rounded-md p-8 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-2">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded-md w-full"
              autoComplete="name"
              maxLength="30"
              value={fullName || (address && address.name) || ""}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="w-1/2 ml-2">
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 p-2 rounded-md w-full"
              autoComplete="user-address-phone"
              value={phoneNumber || (address && address.phone_number) || ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 w-full max-w-md">
          <select
            id="province"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={selectedProvinceId || (address && address.province) || ""}
            onChange={handleProvinceChange}
          >
            <option value="">{address && address.province}</option>
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
            value={selectedCityId || (address && address.city) || ""}
            onChange={handleCityChange}
          >
            <option value="">{address && address.city}</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        {/* {JSON.stringify(geolocation) && (
          <div>
            <p>
              Latitude:{" "}
              {geolocation?.latitude || (address && address?.latitude) || ""}
            </p>
            <p>
              Longitude:
              {geolocation?.longitude || (address && address?.longitude) || ""}
            </p>
          </div>
        )} */}
        <div className="mb-4 w-full max-w-md">
          <input
            type="text"
            placeholder="postal code"
            className="border border-gray-300 p-2 rounded-md w-full"
            autoComplete="postal-code"
            maxLength="10"
            value={postalCode || (address && address.postal_code) || ""}
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
            value={streetAddress || (address && address.address) || ""}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <textarea
            rows="2"
            placeholder="Additional Details (Optional)"
            className="border border-gray-300 p-2 rounded-md w-full"
            autoComplete="user-address-additional-details"
            maxLength="160"
            value={
              additionalDetails || (address && address.additional_details) || ""
            }
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Save Address
        </button>
      </div>
    </div>
  );
}

export default UpdateAddress;
