// import './App.css';
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Login from "./pages/Login";
import { checkLogin } from "./features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import AddProduct from "./pages/addProduct";
import AddCategory from "./pages/addCategory";
import Sidebar from "./components/Sidebar";
import Category from "./pages/category";
import Cart from "./pages/cart";
import CartCard from "./pages/cartCard";

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
      {userGlobal.id > 0 ? <Sidebar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/product/addProduct" element={<AddProduct />} />
        <Route path="/category/addCategory" element={<AddCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
