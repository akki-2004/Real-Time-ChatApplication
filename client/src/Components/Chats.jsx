import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Chats() {
    const [chats,setChats] = useState([]);
    const fetchChats =async ()=>{
        const response = await axios.get("http://localhost:3924/api/chats");
        console.log("Hi");
        setChats(response.data);
        
        console.log(response.data);
        
    }
    useEffect(()=>{
        fetchChats();
    },[])
  return (
    <div>
        {
            chats.map((chat,index)=>(
                <div key={index}>{chat.chatName}</div>

            ))
        }
    </div>
  )
}
