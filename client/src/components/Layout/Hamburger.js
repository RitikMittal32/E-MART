import React, { useRef } from "react";
import {  Link } from "react-router-dom";
import { Badge } from "antd";
import './Header.css';
import { FaRegUserCircle } from "react-icons/fa";

const Hamburger = ({handleClick, handleLogout, auth, categories, cart, list}) => {
          // const list = useRef();

  return (
          <div className="fixed-top h change" ref={list}>
        
          <div className="ha">
          <div className="hamburgur" onClick={(e) => handleClick(e)} >
            <span></span>
            <span></span>
            <span></span>
          </div>
          </div>
        <div className="main-heading" >
        <div className="heading">
          <div className="nav">
           <div className="logo-title "> <Link to="/" className="navbar-brand">
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
  )
}

export default Hamburger
