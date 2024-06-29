import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import { sliderImage } from "../components/data/Image";
import { Icons } from "../components/data/Icon";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPageIndex = (currentPageIndex + 1) % sliderImage.length;
      setCurrentPageIndex(nextPageIndex);
    }, 5000); // Change the interval time as desired

    return () => clearInterval(interval);
  }, [currentPageIndex, sliderImage.length]);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={"ALL Products - Best offers "}>
      <div className="homepage">
      {/* banner image */}
      {/* <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
      {/* banner image */}
      <div className="ba">
        <div className="banner-imgs">
        {sliderImage.map((item,index) => {
          return( 
            <div style={{ display: index === currentPageIndex ? 'block' : 'none' }}>
          <img
          src={`${item.img}`}
          className="banner-img"
          alt="bannerimg"
          
          />
          </div>
        )})}
        </div>
        <div>
          <div className="new-side">
            <img src="./images/eCommerce-Development.svg"  alt="neew"/>
          </div>
        </div>
      </div>
      <div className="home-page">
       <div className="filters-home">
        <div className="filters">
          <div className="category-filter">
          <h4 className="text-center mt-0">Category</h4>
          <div className="categories">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          </div>
          {/* price filter */}
          <div className="price-filter">
          <h4 className="text-center mt-0">Price</h4>
          <div>
            
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              <div className="prices">
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
              </div>
            </Radio.Group>
          </div>
          </div>
          </div>
          <div className="reset">
          <div className="reset-button">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          </div>
          </div>
        <div className="div">
        <div className="products-details">
          <h1 className="text-center mt-0">PRODUCTS</h1>
          <div className="d-flex flex-wrap product">
            {products?.map((p) => (
              <div className="card" key={p._id}>
                <button
                      className="btns btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                <div className="main-card">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                  </div>
                  <div className="card-texts">
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  </div>
                  <div className="card-name-prices">

                  <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                    <button
                      className="btns ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      <img className="cart-icons" src="./icons/cart.png" alt="cart"/> 
                    </button>
                  </div>
                </div>
                </div>
                </button>
              </div>
            ))}
            
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
      <div className="slider">
      <div className="icons-slider">
        {Icons.map((item) => {
          return( 
            <div className="icons">
              <img src={`${item.imgs}`} alt="logo" style={{width : "110px" , height : "100%"}}/>
            </div>
        )})}
      </div>
      </div>
      </div>
    </Layout>
  );
};

export default HomePage;
