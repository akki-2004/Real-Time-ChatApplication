import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Don't forget to import axios
import im2 from "./hide.png";
import im1 from "./images.png";

export default function Login() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Should be a boolean

    const history = useNavigate();
    const toast = useToast();
    const handleShowClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(
                "http://localhost:3924/api/user/login",
                { email, password }
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history("/chats");
        } catch (error) {
            setLoading(false); // Ensure loading is false on error
            const errorMessage = error.response ? error.response.data.message : 'Network Error. Please try again later.';
            toast({
                title: "Error Occurred!",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    return (
        <VStack spacing={'5px'}>
            <FormControl id='email' isRequired>
                <FormLabel>Email:</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password:</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button h="1.75rem" size={"sm"} onClick={handleShowClick}>
                            <img src={show ? im1 : im2} style={{ width: '20px', height: '20px', opacity: "3" }} alt="toggle visibility" />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme="green"
                bg={"green.100"}
                color={"green"}
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading} // Added loading state to button
            >
                Login
            </Button>
        </VStack>
    );
}
