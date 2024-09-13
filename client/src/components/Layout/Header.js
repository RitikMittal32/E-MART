import React, { useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import './Header.css';
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect,useState } from "react";


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [check,setCheck] = useState(true);

  useEffect(() => {
            const width = window.innerWidth;
            if(width <= 900){
                      setCheck(false);
            }
  },[])
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const list = useRef();

  const handleClick = () => {
    list.current.classList.toggle("change");
    // console.log('k');
  }

  let lastScrollTop = 0; // Variable to store last scroll position

  window.addEventListener("scroll", function() {
      const header = document.querySelector(".header-bar");
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
      if (scrollTop > lastScrollTop) {
          // Scroll Down
          header.style.transform = "translateY(-100%)"; // Move header up
      } else {
          // Scroll Up
          header.style.transform = "translateY(0)"; // Move header back to its position
      }
  
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });
  
  

  return (
    <div className="main-navbar">
      {check ? (<div className="fixed-top header-bar">
        <div>
        <div className="header-tab">
          <div className="first-nav">
           <div className="logo-title"> <Link to="/" className="navbar-brand">
               E-MART
            </Link></div>
            <div className="first-right">
            <ul>
            {!auth?.user ? (
                <>
                  <li>
                    <Link to="/login" className='item'>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className='item'>
                     Register
                    </Link>
                  </li>
                  
                </>
              ) : (
                <>
                      <li>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className='item'
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          to="/login"
                          className='item'
                        >
                           Logout
                        </Link>
                      </li>
                      
                   
                  
                </>
              )}
              <li>
                <Link to="/cart" className='item'>
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                  <p>🛒 Cart</p>  
                  </Badge>
                </Link>
              </li>
              <div className="user">
              <FaRegUserCircle /> {auth?.user?.name}
              </div>
            </ul>
            </div>
          </div>
        </div>
        {auth?.user ? (
          <>
        <div className="single-line"></div>
      <div className="second-nav">
        <ul>
              <li>
                <Link to="/" className='item'>
                  Home
                </Link>
              </li>
             
                
                
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>

        
      </div>
      </>
        ) : (
          <>
          </>
        )}
      </div>
      </div>
  ): (
    <>
    <div className="fixed-top h" ref={list}>
        
          <div className="ha">
          <div className="hamburgur" onClick={() => handleClick()} >
            <span></span>
            <span></span>
            <span></span>
          </div>
          </div>
        <div className="main-heading" >
        <div className="heading">
          <div className="nav">
           <div className="logo-title"> <Link to="/" className="navbar-brand">
               E-MART
            </Link></div>
            <div className="fright">
            <ul>
            <li  onClick={() => handleClick()}>
                <Link to="/cart" className='item'>
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                  <p>🛒 Cart</p>  
                  </Badge>
                </Link>
              </li>
              <div className="user"  onClick={() => handleClick()}>
              <FaRegUserCircle /> {auth?.user?.name}
              </div>
            {!auth?.user ? (
                <>
                  <li  onClick={() => handleClick()}>
                    <Link to="/login" className='item'>
                      Login
                    </Link>
                  </li>
                  <li  onClick={() => handleClick()}>
                    <Link to="/register" className='item'>
                     Register
                    </Link>
                  </li>
                  
                </>
              ) : (
                <>
                      <li  onClick={() => handleClick()}>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className='item'
                        >
                          Dashboard
                        </Link>
                      </li >
                      <li  onClick={() => handleClick()}>
                        <Link
                          onClick={handleLogout}
                          to="/login"
                          className='item'
                        >
                           Logout
                        </Link>
                      </li>
                      
                   
                  
                </>
              )}
            </ul>
            </div>
          </div>
        </div>
        {auth?.user ? (
          <>
        <div className="single-line"></div>
      <div className="nav">
        <ul>
              <li>
                <Link to="/" className='item'>
                  Home
                </Link>
              </li>
             
                
    
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>

        
      </div>
      </>
        ) : (
          <>
          </>
        )}
      </div>
      </div>
    </>
  )}
    </div>
  );
};

export default Header;
