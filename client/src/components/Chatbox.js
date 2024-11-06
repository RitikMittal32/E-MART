import { Box } from "@chakra-ui/layout";
import "./styles.css";
import AdminChatWindow from "./AdminChatWindow"; // Import Admin Chat Window
import ChatWindow from "./ChatWindow";
import { ChatState } from "../context/ChatProvider";
import { useAuth } from "../context/auth";
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, user } = ChatState();
  const [auth, setAuth] = useAuth();
  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      height="100vh"
      borderRadius="lg"
      borderWidth="1px"
    >
      {auth?.user?.role === 1 ? ( // Check if the user is an admin
        <AdminChatWindow selectedChat={selectedChat} user={user} /> // Render AdminChatWindow if admin
      ) : (
        <ChatWindow user={user} /> // Render ChatWindow if regular user
      )}
    </Box>
  );
};

export default Chatbox;
