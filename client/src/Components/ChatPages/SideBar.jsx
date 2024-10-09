import { Box, Button, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react'

export default function SideBar() {
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(false);
  const [loadingChat,setLoadingChat]=useState(false);
  const [searchResult,setSearchResult]=useState([]);

  return (
    <>
      <Box
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="grey"
      W="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px">
        <Tooltip label="Search users to chat!" hasArrow placement='bottom-end'>
          <Button variant={"ghost"}>
            <Text d={{base:"none", md:"flex"}} px="4">Search User</Text>
            <i class="fas fa-search"></i>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Afacad Flux"}>Chattify
          
        </Text>
      </Box>
    </>
  )
}
