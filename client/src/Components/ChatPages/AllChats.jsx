import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

export default function AllChats() {
  const [logged, setlogged] = useState()
  const {selectedChat,setSelectedChat,user,chats,setChats}= ChatState();
  const toast=useToast();
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
      };
      
      

      const data  = await axios.get("http://localhost:3924/api/chat", config);
      setChats(data.data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("userInfo"));

    // setlogged(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return (
    <div>
      <h1>all chats</h1>
      <h1>hi</h1>
    </div>
  )
}
