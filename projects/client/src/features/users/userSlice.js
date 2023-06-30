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
    },
  },
  reducers: {
    // Function untuk memasukkan data dari login ke global state
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
      let response = await Axios.get("http://localhost:8000/users");
      console.log(response.data);
      dispatch(setUser(response.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function registerUser(data) {
  return async (dispatch) => {
    try {
      let response = await Axios.post(
        "http://localhost:8000/auth/register",
        data
      );
      console.log(response);
      if (response) {
        Swal.fire(response.data.message);
      }
    } catch (error) {
      console.error(error);
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

export function changePassword(data) {
  return async (dispatch) => {
    try {
      let response = await Axios.post(
        "http://localhost:8000/auth/changePassword",
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

// export function loginUser(data) {
//   return async (dispatch) => {
//     console.log(data);
//     try {
//       let response = await Axios.post("http://localhost:8000/auth/login", data);
//       console.log(response);
//       if (response) {
//         dispatch(setUser(response.data.data));
//         localStorage.setItem("user_token", response.data.token);
//         Swal.fire(response.data.message, "success");
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "An error occurred. Please try again later.", "error");
//     }
//   };
// }

export function checkLogin(token) {
  return async (dispatch) => {
    debugger;
    try {
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
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
    }
  };
}

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
        Swal.fire("Password Anda berhasil diganti.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(error.message);
    }
  };
}

export function editProfile(data) {
  return async (dispatch) => {
    try {
      const userToken = localStorage.getItem("user_token");
      const response = await Axios.patch(
        `http://localhost:8000/user/edit`, // Ubah endpoint sesuai kebutuhan
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // Dispatch action untuk memperbarui data pengguna di Redux state
      Swal.fire("Profile updated successfully"); // Menampilkan notifikasi sukses
    } catch (error) {
      Swal.fire(error.message); // Menampilkan notifikasi error
    }
  };
}
