import React, { useEffect, useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { Box, Text, Stack, Input, Button, Spinner, useToast } from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import { getSender } from '../../logic/ChatLogic';
import GroupChatModal from './GroupChatsModal';
import UserListItem from './UserListItem';

export default function AllChats({fetchAgain}) {
  const [logged, setlogged] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const toast = useToast();

  // Fetching all existing chats
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const data = await axios.get("http://localhost:3924/api/chat", config);
      setChats(data.data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setlogged(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [ fetchAgain]);

  // Handle search functionality
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const data = await axios.get(`http://localhost:3924/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data.data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  // Access chat with a user
  // Access chat with a user
const accessChat = async (userId) => {
  try {
    setLoadingChat(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post("http://localhost:3924/api/chat", { userId }, config);
    if (!chats.find((chat) => chat._id === data._id)) setChats([data, ...chats]);
    setSelectedChat(data);
    setLoadingChat(false);

    // Clear search and hide results after selecting a chat
    setSearchResult([]); // Clears search results
    setSearch("");       // Resets search input
  } catch (error) {
    toast({
      title: "Error fetching the chat!",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
    setLoadingChat(false);
  }
};


  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="lg"
      overflowY="auto"
      maxH="90vh"
    >
      <Box
  display="flex"  
  flexDir="row" 
  alignItems="center"
  justifyContent="space-between" 
  w="100%" 
  pb={3}
  px={3}
  fontSize={{ base: "28px", md: "30px" }}
  fontFamily="Work sans"
  borderBottom="1px solid lightgray"
>
  <Text fontWeight="bold">My Chats</Text>
  <GroupChatModal>
    <Button
      display="flex" 
      fontSize={{ base: "17px", md: "10px", lg: "17px" }}
      rightIcon={<AddIcon />}
    >
      New Group Chat
    </Button>
  </GroupChatModal>
</Box>


     
      <Box display="flex" alignItems="center" pb={2} width="100%">
  <Input
    placeholder="Search by name or email"
    mr={2} 
    border={"1px black solid"}
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    flex="1" // Makes the Input take up as much space as possible
  />
  <Button onClick={handleSearch}>
    <SearchIcon />
  </Button>
</Box>


      {/* Display searched users */}
    {/* Display searched users */}
{loading ? (
  <ChatLoading />
) : (
  searchResult.map((searchedUser) => (
    <UserListItem
      key={searchedUser._id}
      user={searchedUser}  // Pass the user object directly
      handleFunction={() => accessChat(searchedUser._id)}  // Access chat with the user
    />
  ))
)}


      {loadingChat && <Spinner ml="auto" d="flex" />}

     
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(logged, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}
