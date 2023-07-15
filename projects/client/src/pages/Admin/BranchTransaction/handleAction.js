import Swal from "sweetalert2";
import Axios from "axios";

const handleCancelTransaction = async (transactionId, fetchData) => {
  const adminToken = localStorage.getItem("admin_token");

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
        `http://localhost:8000/admin/cancelTransaction/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
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

const handleSendTransaction = async (transactionId, fetchData) => {
  const adminToken = localStorage.getItem("admin_token");

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
        `http://localhost:8000/admin/sendTransaction/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
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

export { handleCancelTransaction, handleSendTransaction };
