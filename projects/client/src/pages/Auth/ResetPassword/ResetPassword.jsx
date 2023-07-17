import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../features/users/userSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (value) => {
    const data = { newPassword: value.password, ...value };
    dispatch(resetPassword(data, token, navigate));
  };

  return (
    <div>
      <ResetPasswordForm handleResetPassword={handleResetPassword} />
    </div>
  );
}

export default ResetPassword;
