import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function Verification() {
  const navigate = useNavigate();
  const { token } = useParams();

  const tokenVerification = async () => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/verification`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        Swal.fire({
          text: response.data.message,
          icon: "success",
        }).then(() => {
          navigate("/user/login");
        });
      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error",
        }).then(() => {
          navigate("/notfound");
        });
      }
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  return <></>;
}

export default Verification;
