import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "../../config/axiosConfig";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./admin.css"
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid row dashboard" style={{marginTop : "130px"}}>
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
  {products?.map((p) => (
    <Link
      key={p._id}
      to={`/dashboard/admin/product/${p.slug}`}
      className="product-link"
    >
      <div className="main-card" style={{ width: "18rem" }}>
        <img
          src={`https://e-mart-1.onrender.com/api/v1/product/product-photo/${p._id}`}
          className="card-img-top"
          alt={p.name}
        />
        <div className="card-body">
          <h5 className="card-title">{p.name}</h5>
          <p className="card-text">{p.description}</p>
          <p className="card-price">{p.price}</p>
        </div>
      </div>
    </Link>
  ))}
</div>

        </div>
      </div>
    </Layout>
  );
};

export default Products;
