import { Box } from "@chakra-ui/layout";
import { useState, useEffect, useRef } from "react";
import Chatbox from "../components/Chatbox";
import { MyChats } from "../components/MyChats";
import Layout from "../components/Layout/Layout";
import { ChatState } from "../context/ChatProvider";

const AdminChatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const chatboxRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [fetchAgain]);

  return (
    <Layout title={"Message"}>
      <Box className="container-fluid" p={0} mb={4} height="100vh" overflow="hidden">
        <Box display="flex" width="100%" height="calc(100vh - 150px)" mt="150px">
          <Box width="33%">
            <MyChats fetchAgain={fetchAgain} />
          </Box>
          <Box 
            width="67%" 
            ref={chatboxRef} 
            overflowY="auto" 
            height="100%"
          >
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default AdminChatpage;
