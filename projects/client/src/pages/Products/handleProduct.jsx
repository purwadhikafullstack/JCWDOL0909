import Axios from "axios";
import Swal from "sweetalert2";

export const handleAddToCart = async (
  navigate,
  product,
  userGlobal,
  cartItems,
  dispatch,
  addItem,
  increaseQuantity
) => {
  if (userGlobal.id <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Please login first to make any transaction",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/user/login");
      }
    });
  } else {
    const existingItem = cartItems.find(
      (item) => item.id_product === product.id_product
    );
    if (existingItem) {
      dispatch(increaseQuantity(product.id_product));
    } else {
      dispatch(addItem({ ...product, quantity: 1 }));
    }
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Added to your cart",
    });
  }
};

export const handleProductClick = async (product, navigate) => {
  try {
    const response = await Axios.get(
      `http://localhost:8000/products/${product.id_product}`
    );
    const selectedProduct = response.data;
    navigate(`/product/${product.id_product}`);
  } catch (error) {
    console.log(error);
  }
};
