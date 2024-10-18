import { Avatar, Box, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Toast, Tooltip, useToast } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import ChatLoading from './ChatLoading';
import axios from 'axios';
import UserListItem from './UserListItem';

// import { accessChat } from '../../../../server/controllers/chatController';

export default function SideBar() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  // const [selectedChat, setSelectedChat] = useState([]);
  const history=useNavigate();
  const {user,setSelectedChat,chats,setChats} = ChatState();
  const loggoutt=()=>{
    localStorage.removeItem("userInfo");
    history('/');
  }
  const accessChat=async(userId)=>{ 
   try {
    setLoadingChat(true);
    const config = {
      headers:{
      "Content-type": "application/json",
      Authorization: `Bearer $[user.token}`
      },};

      const {respone}=await axios.post("http://localhost:3924/api/chat",{userId},config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setLoadingChat(false);
      setSelectedChat(respone);
   } catch (error) {
    toast({
      title: "Error fetching the chat!",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
      });
   }
  }
  const toast=useToast();

  const handleSearch=async()=>{
    if(!search){
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
        });
        return;
    }
    try {
      setLoading(true);
      const config={
          headers:{
            Authorization:`Bearer ${user.token}`,
          }
      }

      const data=await axios.get(`http://localhost:3924/api/user?search=${search}`,config);
      setLoading(false);
      setSearchResult(data.data); 
      console.log(searchResult);
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        });
    }
  }
  return (
    <>
      <Box
        display="flex" // Use `display` instead of `d`
        justifyContent="space-between" // Adjust content distribution across the box
        alignItems="center" // Vertically center the content
        bg="white"
        width="100%" // Use `width` instead of `W`
        p="5px 10px"
        borderWidth="5px"
      >
        {/* <Tooltip label="Search users to chat!" hasArrow placement='bottom-end'>
          <Button variant={"ghost"}>
            <Text display={{ base: "none", md: "flex" }} px="4">Search User</Text>
            <i className="fas fa-search"></i> 
          </Button>
        </Tooltip> */}

        <Text fontSize="3xl" fontWeight={600} color={'green'} pl={4} fontFamily={"Afacad Flux"} textAlign="center">
          Chattify
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            {/* <MenuList> </MenuList> */}

          </Menu>
          <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size={'sm'} cursor={"pointer"} name={user.name}/>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>

              <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={loggoutt}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>


      <Box d={"flex"} pb={2}>
      <Input
placeholder="Search by name or email"
mr={2}
value={search}
onChange={(e) =>setSearch(e.target.value)}/>
      <Button
       onClick={handleSearch}
       >Go</Button>
      </Box>
      {loading ? (
        <ChatLoading />
      ) : (
        searchResult.length > 0 && // Ensure searchResult is not empty
        searchResult.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            handleFunction={() => accessChat(user._id)}
          />
        ))
      )}
      {loadingChat && <Spinner ml={'auto' } d={'flex'}/>}
    </>
  );
}
