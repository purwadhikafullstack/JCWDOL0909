import AdminLayout from "../../../components/AdminLayout";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EditProductSection from "./EditProductSection";

function EditProductForm({ editProductData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const adminToken = localStorage.getItem("admin_token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("productName", name || product.name);
    formData.append("productPrice", price || product.price);
    formData.append("productStock", stock || product.stock);
    formData.append("productDescription", description || product.description);
    formData.append("file", image);
    formData.append("id_category", category || product.id_category);

    try {
      const response = await Axios.patch(
        `http://localhost:8000/admin/editProduct/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (!response.data.success || !response.data.updatedProduct) {
        throw new Error(response.data.message);
      }
      const editedProductData = {
        productName: name || (product && product.name) || "",
        productPrice: price || (product && product.price) || "",
        productStock: stock || (product && product.stock) || "",
        productDescription:
          description || (product && product.description) || "",
        image: response.data.updatedProduct.image || product.image,
        id_category: category || (product && product.id_category) || "",
      };

      editProductData(editedProductData);
      navigate("/admin/Product");
      Swal.fire(response.data.message);
    } catch (error) {
      Swal.fire(error.message);
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file instanceof Blob) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (product && product.image) {
      setPreviewImage(`http://localhost:8000/${product.image}`);
    } else {
      setPreviewImage("");
    }
  }, [product]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await Axios.get(
          `http://localhost:8000/admin/product/getProductById?idProduct=${id}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        const productData = productResponse.data;
        setProduct(productData);
        setPreviewImage(`http://localhost:8000/${productData.image}`);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (editProductData) {
      setName(editProductData.productName);
      setPrice(editProductData.productPrice);
      setStock(editProductData.productStock);
      setDescription(editProductData.productDescription);
      setCategory(editProductData.id_category);
      setPreviewImage(editProductData.image);
    }
  }, [editProductData]);

  useEffect(() => {
    Axios.get("http://localhost:8000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AdminLayout>
      <EditProductSection
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        stock={stock}
        setStock={setStock}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        categories={categories}
        product={product}
        previewImage={previewImage}
        handleImageChange={handleImageChange}
      />
    </AdminLayout>
  );
}

export default EditProductForm;
