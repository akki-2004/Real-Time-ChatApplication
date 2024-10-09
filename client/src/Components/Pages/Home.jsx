import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const history = useNavigate();

useEffect (() => {
const user = JSON.parse(localStorage.getItem("userInfo"));
if (user) history("/chats");
}, [history]);
    return (
        <div>
            <Container maxW="xl"  centerContent>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    p={3}
                    bg={"green.200"}
                    color="black"
                    w="100%"
                    m="150px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                    
                >
                    <Text textAlign="center" fontSize="4xl" fontFamily="Afacad Flux">
                        Chattify
                    </Text>
                </Box>
                <Box w="100%"
                    bg="black"
                    p={4}
                    color={"white"}
                    borderRadius="lg"
                    borderWidth="1px">

                    <Tabs variant='soft-rounded' colorScheme='green'>
                        <TabList mb="1em">
                            <Tab width="50%" color={'white'}>Login</Tab>
                            <Tab width="50%"  color={'white'}>SignUp</Tab>
                        </TabList> 
                        <TabPanels>
                            <TabPanel>
                                <Login/>
                            </TabPanel>
                            <TabPanel>
                                <SignUp/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </div>
    );
}
