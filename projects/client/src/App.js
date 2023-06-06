// import './App.css';
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register/Register";
import Products from "./pages/Products/Product";
import Login from "./pages/Auth/Login/Login";
import { checkLogin } from "./features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./pages/Products/addProduct";
import AddCategory from "./pages/Category/addCategory";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/Error/NotFound";
import Navbar from "./components/Navbar";

function App() {
  const userGlobal = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user_token");
  // const userGlobal = useSelector((state) => state.users.user);

  useEffect(() => {
    if (userToken) {
      // alert(userToken);
      dispatch(checkLogin(userToken));
    }
    // alert(userToken)
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/product/addProduct" element={<AddProduct />} />
        <Route path="/category/addCategory" element={<AddCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Products />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </div>
  );
}

export default App;
