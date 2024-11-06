import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client"; // Make sure to import io from socket.io-client

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [socket, setSocket] = useState(null); // Add state for socket


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("auth"));
  
    // Initialize the socket connection only if userInfo is available
    if (userInfo && userInfo.user) {
      setUser(userInfo);
  
      const newSocket = io("http://localhost:4300", {
        transports: ["websocket"], // Optional: to force WebSocket transport
      });
      setSocket(newSocket);
      
      console.log(userInfo.user); // Check user information
  
      newSocket.on('connect', () => {
        console.log('Connected to socket');
        // Ensure userInfo.user._id is defined
        if (userInfo.user._id) {
          if(userInfo.user._id === "6595132ddd5e54715069ab59"){
            newSocket.emit('admin setup');
          }
          newSocket.emit('setup', userInfo.user._id); // Emit user ID as a string
        } else {
          console.error("User ID is undefined");
        }

    
      });
      
      newSocket.on('connected', () => {
        console.log('Successfully joined room');
      });
  
      // Clean up the socket connection on unmount
      return () => {
        newSocket.disconnect(); // Uncomment to disconnect when the component unmounts
      };
    } else {
      console.error("User information is not available");
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        socket, // Provide socket to the context
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
