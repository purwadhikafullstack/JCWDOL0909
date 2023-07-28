import Axios from "axios";
import Swal from "sweetalert2";

export const fetchAddressData = async (id, userToken) => {
  try {
    const addressResponse = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/address/fetchAddressById?idAddress=${id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const address = addressResponse.data;
    return address[0];
  } catch (error) {
    console.log(error);
    alert(error.message);
    return null;
  }
};

export const editAddress = async (id, data, userToken) => {
  try {
    const response = await Axios.patch(
      `${process.env.REACT_APP_API_BASE_URL}/address/editAddress?id_address=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchProvinces = async () => {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/rajaongkir/province`
    );
    const provinces = response.data.rajaongkir.results;
    return provinces;
  } catch (error) {
    throw new Error("Error fetching provinces:", error);
  }
};

export const fetchCities = async (provinceId) => {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/rajaongkir/city?provinceId=${provinceId}`
    );
    const cities = response.data.rajaongkir.results;
    return cities;
  } catch (error) {
    throw new Error("Error fetching cities:", error);
  }
};

export const fetchGeolocation = async (province, city_name) => {
  try {
    const url = `${process.env.REACT_APP_API_BASE_URL}/opencage/geolocation/${province}/${city_name}`;
    const response = await Axios.get(url);
    const location = response.data;
    return location;
  } catch (error) {
    throw new Error("Error fetching geolocation:", error);
  }
};

export const handleEditAddress = async (id, data, userToken) => {
  try {
    const response = await editAddress(id, data, userToken);
    return response;
  } catch (error) {
    throw new Error("Error editing address:", error);
  }
};
