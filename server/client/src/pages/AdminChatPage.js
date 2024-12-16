import { Box } from "@chakra-ui/layout";
import { useState, useEffect, useRef } from "react";
import Chatbox from "../components/Chatbox";
import { MyChats } from "../components/MyChats";
import Layout from "../components/Layout/Layout";
import { ChatState } from "../context/ChatProvider";

const AdminChatpage = () => {
  const chatboxRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, []);

  return (
    <Layout title={"Message"}>
<div className="container-fluid mb-4 lg:mt-[10px]">

      <div
        className="d-flex flex-column flex-sm-row mt-12"
        style={{ width: "100%", height: "100%" }}
      >
        {/* First Box */}
        <div
          style={{
            width: "100%",
            height: "50%",
            overflowY: "auto",
          }}
          className="flex-sm-33"
        >
          <MyChats />
        </div>
  
        {/* Second Box */}
        <div
          style={{
            width: "100%",
            height: "50%",
            overflowY: "auto",
          }}
          className="flex-sm-67 "
        >
          <Chatbox />
        </div>
      </div>
    </div>
  </Layout>
  
  
  );
};

export default AdminChatpage;
