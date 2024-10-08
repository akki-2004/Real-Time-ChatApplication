import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import im2 from "./hide.png";
import im1 from "./images.png";

export default function SignUp() {
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [password, setPassword] = useState('');
    const [pic, setPic] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useNavigate();

    const handleShowClick = () => setShow(!show);

    const postDetails = (image) => {
    

            
    };

    const submitHandler = async () => {
        setLoading(true);

        // Validate input fields
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        if (password !== confirmpassword) {
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        try {
            // Perform the signup API call
            const response = await axios.post('http://localhost:3924/api/user/signup', { name, email, password, pic });

            // Check if the response is valid
            if (response && response.data) {
                toast({
                    title: 'Registration successful!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                history('/chats');
            } else {
                throw new Error('Invalid response from the server');
            }
        } catch (error) {
            console.error("Error during signup:", error); // Log error for debugging
            toast({
                title: 'Error occurred!',
                description: error.response ? error.response.data.message : 'Something went wrong, please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <VStack spacing={'5px'}>
            <FormControl id='name' isRequired>
                <FormLabel>Name:</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

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

            <FormControl id='confirm-password' isRequired>
                <FormLabel>Confirm Password:</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm Your Password'
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button h="1.75rem" size={"sm"} onClick={handleShowClick}>
                            <img src={show ? im1 : im2} style={{ width: '20px', height: '20px', opacity: "3" }} alt="toggle visibility" />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic' isRequired>
                <FormLabel>Upload Profile Picture:</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                colorScheme="green"
                bg={"green.100"}
                color={"green"}
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading} // Add loading state to button
            >
                Sign Up
            </Button>
        </VStack>
    );
}
