import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "./pages/Auth/Register/Register";
import Products from "./pages/Products/Product";
import Login from "./pages/Auth/Login/Login";
import { checkLogin } from "./features/users/userSlice";
import { checkLoginAdmin } from "./features/admins/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./pages/Products/addProduct";
import AddCategory from "./pages/Category/addCategory";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/Error/NotFound";
import Navbar from "./components/Navbar";
import ProductDetailPage from "./pages/Products/ProductDetail";
import VerifyEmail from "./pages/Auth/Activation/VerifyEmail";
import ChangePassword from "./pages/Auth/ChangePassword/ChangePassword";
import ConfirmEmail from "./pages/Auth/ResetPassword/ConfirmEmail";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import BeforeLoginNavbar from "./components/BeforeLoginNavbar";
import Profile from "./pages/Profile/Profile";
import ProfilePictureUpload from "./pages/Profile/ProfilePicture";
import LoginAdmin from "./pages/Admin/LoginAdmin/LoginAdmin";
import CreateAdmin from "./pages/Admin/CreateAdmin/CreateAdmin";

function App() {
  const userGlobal = useSelector((state) => state.users.user);
  const adminGlobal = useSelector((state) => state.admins.admin);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user_token");
  const adminToken = localStorage.getItem("admin_token");
  const location = useLocation();

  const shouldShowNavbar =
    location.pathname !== "/user/register" &&
    location.pathname !== "/user/login" &&
    location.pathname.toLowerCase() !== "/notfound" &&
    location.pathname !== "/user/verifyEmail/:token" &&
    !location.pathname.startsWith("/admin"); // Menambahkan kondisi untuk routes admin

  useEffect(() => {
    if (userToken) {
      dispatch(checkLogin(userToken));
    } else if (adminToken) {
      dispatch(checkLoginAdmin(adminToken));
    }
  }, []);

  return (
    <div>
      {shouldShowNavbar &&
        (userGlobal.id > 0 ? <Navbar /> : <BeforeLoginNavbar />)}

      <Routes>
        {/* Routes for user  */}
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/confirmEmail" element={<ConfirmEmail />} />
        <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/product/addProduct" element={<AddProduct />} />
        <Route path="/category/addCategory" element={<AddCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Products />} />
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/user/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/user/changePassword" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/profilePicture" element={<ProfilePictureUpload />} />

        {/* Routes for admin  */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/createAdmin" element={<CreateAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
