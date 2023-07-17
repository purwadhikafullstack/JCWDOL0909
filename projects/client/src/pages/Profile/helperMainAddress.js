import Axios from "axios";

export const fetchMainAddressData = async () => {
  const userToken = localStorage.getItem("user_token");
  try {
    const response = await Axios.get(
      "http://localhost:8000/address/fetchMainAddress",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return(response.data);
  } catch (error) {
    console.log(error);
    return [];
  };
}