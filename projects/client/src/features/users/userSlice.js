import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Swal from "sweetalert2";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {
      id: "",
      email: "",
      phoneNumber: "",
      name: "",
      gender: "",
      birthday: "",
      imagePath: "",
      address: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        email: "",
        phoneNumber: "",
        name: "",
        gender: "",
        birthday: "",
        imagePath: "",
        address: "",
      };
    },
  },
});

export const { setUser, resetUser } = usersSlice.actions;
export default usersSlice.reducer;
const userToken = localStorage.getItem("user_token");

export function fetchUsersData() {
  return async (dispatch) => {
    try {
      let response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
      dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function registerUser(data) {
  return async (dispatch) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        data
      );
      if (response) {
        Swal.fire(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        Swal.fire("Error", error.response.data.message, "error");
      } else {
        Swal.fire(
          "Error",
          "An error occurred. Please try again later.",
          "error"
        );
      }
    }
  };
}

export function changePassword(data, userToken) {
  return async (dispatch) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/changePassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response);
      if (response) {
        Swal.fire(response.data);
      }
    } catch (error) {
      Swal.fire(error.message);
    }
  };
}

export function checkLogin(token) {
  return async (dispatch) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/check-login`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function loginUser(data) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        data
      );
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        localStorage.setItem("user_token", response.data.token);
        if (response) {
          Swal.fire(response.data.message);
        }
      } else {
        Swal.fire(response.data.message);
      }
    } catch (error) {
      Swal.fire(error);
      console.log(error);
    }
  };
}

export function verifyEmail(data) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/verifyEmail`,
        { data }
      );
      if (response.data.success) {
        Swal.fire(
          "We've send link verification to your email to activate your account."
        );
      }
    } catch (error) {
      Swal.fire(error);
      console.log(error);
    }
  };
}

export function confirmEmail(data) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/confirmEmail`,
        data
      );
      if (response.data.success) {
        Swal.fire(
          "We've send link verification to your email to reset your password."
        );
      }
    } catch (error) {
      Swal.fire("Please enter the email that you used to register.");
    }
  };
}

export function resetPassword(data, token, navigate) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/resetPassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        Swal.fire("Your password has been changed.");
        navigate("/user/login");
      }
    } catch (error) {
      console.log(error);
      Swal.fire(error.message);
    }
  };
}

export function editProfile(data) {
  return async (dispatch) => {
    try {
      const userToken = localStorage.getItem("user_token");
      const response = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/edit`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      Swal.fire("Profile updated successfully");
    } catch (error) {
      Swal.fire(error.message);
    }
  };
}
