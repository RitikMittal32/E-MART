import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import "./CHamburger.css";
import {
          Menu,
          MenuButton,
          MenuDivider,
          MenuItem,
          MenuList,
        } from "@chakra-ui/menu";
 import { getSender } from "../../config/ChatLogics";
 import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
const CHamburger = ({ handleClick, handleLogout, auth, categories, cart }) => {
  const [isOpen, setIsOpen] = useState(false); // Change to handle click instead of hover
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats
  } = ChatState();
  const toggleMenu = () => setIsOpen(!isOpen); // Toggle the menu on click

  return (
    <div className="hamburger-container">
      <div 
        className={`hamburger-icon ${isOpen ? "active" : ""}`} 
        onClick={toggleMenu} // Use click to toggle
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div className={`menu-items ${isOpen ? "open" : ""}`}>
        <ul>
        {!auth?.user ? (
                <>
                  <li style={{ '--i': 1 }}>
                    <Link to="/login" className='item text-black' >
                      Login
                    </Link>
                  </li>
                  <li style={{ '--i': 2 }}>
                    <Link to="/register" className='item text-black'>
                     Register
                    </Link>
                  </li>
                  
                </>
              ) : (
                    <>
          <li className="menu-item" style={{ '--i': 1 }}>
          <div>
            <Link to="/cart" className='item bg-white rounded-full w-full'>
              <Badge
                count={cart?.length}
                showZero
                offset={[0, 0]}
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                <div className="w-10">
                  <img src="/Cart.svg" alt="cart" />
                </div>
              </Badge>
            </Link>
          </div>
          </li>
          <li style={{ '--i': 2 }}>
            <Link 
              to={auth?.user?.role === 1 ? "/admin-chat" : "/user-chat"} 
              className="item bg-white rounded-full w-full"
            >
              <div className="w-10 p-1">
                <img src="/Message.svg" alt="chat" />
              </div>
            </Link>
          </li>
          <li style={{ '--i': 3 }}>
            <Link
              onClick={handleLogout}
              to="/login"
              className='item bg-white rounded-full w-full'
            >
              <div className="w-10 p-1">
                <img src="/LogOut.svg" alt="logout" />
              </div>
            </Link>
          </li>
          
          <li className="item" style={{ '--i': 4 }}>
                    <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className='item flex'
                        >
                    <div className='item bg-white rounded-full w-full mr-1'>
                    <div className="w-10 ">
                          <img src="/User.svg" alt="cart" />
                        </div>
                      </div>
                      {/* <div className="uppercase">
                        {auth?.user?.name}
                      </div> */}
                        </Link>
                  
                    </li>
                    <li  style={{ '--i': 5 }}>
                    <Menu>
            <MenuButton p={1}>
              <div className="item bg-white rounded-full w-full"><div className="w-10"><img src="/Notify.svg" alt="notify" /></div></div>
            </MenuButton>
            <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                ))}
              </MenuList>
          </Menu>
                    </li>
                          
                    
                    </>
              )}
    
        </ul>
      </div>
    </div>
  );
};

export default CHamburger;
