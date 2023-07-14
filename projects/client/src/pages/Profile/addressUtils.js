import Axios from "axios";
import Swal from "sweetalert2";

export const saveAddress = async (
  data,
  userToken,
  fetchAddressData,
  closeModal
) => {
  try {
    const response = await Axios.post(
      "http://localhost:8000/address/addAddress",
      data,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    fetchAddressData();
    closeModal();
    if (!response.data.success) {
      Swal.fire(response.data.message);
    } else {
      Swal.fire(response.data.message);
    }
  } catch (error) {
    Swal.fire(error.message);
    console.log(error.message);
  }
};
