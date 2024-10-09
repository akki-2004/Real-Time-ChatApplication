import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../../Context/ChatProvider.jsx'
import { Box } from '@chakra-ui/react'
import SideBar from '../ChatPages/SideBar'
import AllChats from '../ChatPages/AllChats'
import Chat from '../ChatPages/Chat'
export default function Chats() {
    const {user}=ChatState()
  return (
    <div style={{width:"100%"}}>
        {user && <SideBar/>}
        <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        p="10px"
        h="92vh"

        >
            {user && <AllChats/>}
            {user && <Chat/>}
        </Box>
    </div>
  )
}
