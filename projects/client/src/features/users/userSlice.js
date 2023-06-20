import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Swal from "sweetalert2";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {
      id: "",
      name: "",
      email: "",
      username: "",
      imagePath: "",
      isAdmin: false,
    },
  },
  reducers: {
    // Function untuk masukin data dari login ke global state
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        name: "",
        email: "",
        username: "",
        isAdmin: false,
      };
    },
  },
});

export const { setUser, resetUser } = usersSlice.actions;
export default usersSlice.reducer;

export function fetchUsersData() {
  return async (dispatch) => {
    let response = await Axios.get("http://localhost:8000/users");
    console.log(response.data);
    dispatch(setUser(response.data));
  };
}

export function registerUser(data) {
  return async (dispatch) => {
    let response = await Axios.post(
      "http://localhost:8000/auth/register",
      data
    );
    console.log(response);
    if (response) {
      Swal.fire(response.data.message);
    }
  };
}

export function changePassword(data) {
  return async (dispatch) => {
    try {
      let response = await Axios.post(
        "http://localhost:8000/auth/changePassword",
        data
      );
      console.log(response);
      if (response) {
        Swal.fire(response.data.message, "Password has been changed");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        Swal.fire("User does not exist", error.response.data.message, "error");
      } else {
        Swal.fire(
          "Error",
          "An error occurred. Please try again later.",
          "error"
        );
      }
      Swal.fire(response.data.message, "please use another email");
    }
  };
}

export function loginUser(data) {
  return async (dispatch) => {
    console.log(data);
    let response = await Axios.post("http://localhost:8000/auth/login", data);
    console.log(response);
    if (response) {
      dispatch(setUser(response.data.data));
      localStorage.setItem("user_token", response.data.token);
      Swal.fire(response.data.message, "success");
    }
  };
}

export function checkLogin(token) {
  return async (dispatch) => {
    // console.log(token)
    let response = await Axios.post(
      "http://localhost:8000/auth/check-login",
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response) {
      dispatch(setUser(response.data.data));
    }
  };
}

export function loginUser1(data) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/login",
        data
      );
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        localStorage.setItem("user_token", response.data.token);
        if (response) {
          Swal.fire(response.data.message);
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
}

export function verifyEmail(data) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/verifyEmail",
        { data }
      );
      if (response.data.success) {
        Swal.fire("Kami telah mengirim link untuk aktivasi akun Anda.");
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }}}

export function confirmEmail(data) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/confirmEmail",
        data
      );
      if (response.data.success) {
        Swal.fire("Kami telah mengirim link untuk me-reset password Anda.");
      }
    } catch (error) {
      Swal.fire(
        "Masukkan email yang Anda gunakan ketika melakukan registrasi."
      );
    }
  };
}

export function resetPassword(data, token) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/resetPassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        // alert(response.data.message);
        Swal.fire("Password Anda berhasil diganti.");
      }
    } catch (error) {
      Swal.fire(error.message);
    }
  };
}
