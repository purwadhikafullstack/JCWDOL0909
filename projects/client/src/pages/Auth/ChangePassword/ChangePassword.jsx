import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordForm from "./ChangePasswordForm";
import { changePassword } from "../../../features/users/userSlice";

function ChangePassword() {
  const dispatch = useDispatch();

  const handleChangePassword = async (value) => {
    dispatch(changePassword(value));
  };

  return (
    <div>
      <ChangePasswordForm handleChangePassword={handleChangePassword} />
    </div>
  );
}

export default ChangePassword;
