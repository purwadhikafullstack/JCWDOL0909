import Swal from "sweetalert2";
import Axios from "axios";

const handleCancelTransaction = async (transactionId, fetchData) => {
  const userToken = localStorage.getItem("user_token");

  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be canceled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const response = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/cancelTransaction/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      fetchData();
      if (!response.data.success) {
        Swal.fire(response.data);
      } else {
        Swal.fire("Success", response.data.message, "success");
      }
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};

const handleConfirmTransaction = async (transactionId, fetchData) => {
  const userToken = localStorage.getItem("user_token");

  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Confirm your order.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const response = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/confirmTransaction/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      fetchData();
      if (!response.data.success) {
        Swal.fire(response.data);
      } else {
        Swal.fire("Success", response.data.message, "success");
      }
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};

const handleOrderClick = (transactionId, navigate) => {
  navigate(`/payment/${transactionId}`);
};

export { handleCancelTransaction, handleConfirmTransaction, handleOrderClick };
