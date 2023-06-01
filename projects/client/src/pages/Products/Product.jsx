import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuantity } from "../../features/cart/cartSlice";
import Axios from "axios";

import { Input, Select, Button } from "@chakra-ui/react";

function ProductCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProductList] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);

  const fetchProductsData = async () => {
    let response = await Axios.get(`http://localhost:8001/product/product`);
    setProductList(response.data);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id_product === product.id_product
    );
    if (existingItem) {
      dispatch(increaseQuantity(product.id_product));
    } else {
      dispatch(addItem({ ...product, quantity: 1 }));
    }
    alert("berhasil menambahkan ke keranjang");
  };

  const [search, setSearch] = useState(``);
  const [sort, setSort] = useState(`newest`);

  const renderList = () => {
    return products
      .filter((product) => {
        return search.toLowerCase() === ""
          ? product
          : product.product_name.toLowerCase().includes(search);
      })
      .map((product) => {
        return (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={`http://localhost:8001/${product.product_img}`}
              alt={product.product_name}
              className="w-full h-48 object-cover"
            />

            <div key={product.id_product} className="p-4">
              <h2 className="text-lg font-medium">{product.product_name}</h2>
              <p className="text-lg font-medium text-gray-800">
                {product.product_price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                {product.product_desc}
              </p>

              <Button
                onClick={() => handleAddToCart(product)}
                variant="solid"
                colorScheme="pink"
              >
                Buy
              </Button>
            </div>
          </div>
        );
      });
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  useEffect(() => {
    if (sort === "newest") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.id_product - b.id_product)
      );
    } else if (sort === "lowPrice") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.product_price - b.product_price)
      );
    } else if (sort === "highPrice") {
      setProductList((prev) =>
        [...prev].sort((a, b) => b.product_price - a.product_price)
      );
    } else if (sort === "desc") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.product_name - b.product_name)
      );
    } else {
      setProductList((prev) => [...prev].sort());
    }
  }, [sort]);

  return (
    <div className="w-full mx-auto">
      <p className="text-2xl font-sans text-amber-500">PRODUCT LIST</p>
      <Input
        placeholder="Search..."
        onChange={(name) => setSearch(name.target.value)}
      />
      <Select placeholder="Sorted By" onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="lowPrice">Lowest Price</option>
        <option value="highPrice">Highest Price</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </Select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {renderList()}
      </div>
      <div className="items-center hidden space-x-8 lg:flex">
        <Button
          variant="solid"
          colorScheme="pink"
          onClick={() => {
            navigate("/product/addproduct");
          }}
        >
          add new product
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
