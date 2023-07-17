import Axios from "axios";

export const fetchProvinces = async () => {
  try {
    const response = await Axios.get(
      "http://localhost:8000/rajaongkir/province"
    );
    const provinces = response.data.rajaongkir.results;
    return provinces;
  } catch (error) {
    console.log("Error fetching provinces:", error);
    throw error;
  }
};

export const fetchCities = async (provinceId) => {
  try {
    const response = await Axios.get(
      `http://localhost:8000/rajaongkir/city?provinceId=${provinceId}`
    );
    const cities = response.data.rajaongkir.results;
    return cities;
  } catch (error) {
    console.log("Error fetching cities:", error);
    throw error;
  }
};

export const fetchGeolocation = async (province, city_name) => {
  try {
    const url = `http://localhost:8000/opencage/geolocation/${province}/${city_name}`;
    const response = await Axios.get(url);
    const location = response.data;
    return location;
  } catch (error) {
    console.log("Error fetching geolocation:", error);
    throw error;
  }
};
