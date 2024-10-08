import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import im2 from "./hide.png";
import im1 from "./images.png";

export default function SignUp() {
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [password, setPassword] = useState('');
    const [pic, setPic] = useState('');

    const handleShowClick = () => setShow(!show);
    const postDetails = () => {

    }
    const submitHandler = () => {

    }
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
                            <img src={show ? im1 : im2} style={{ width: '20px', height: '20px', opacity: "3" }} />
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
                            <img src={show ? im1 : im2} style={{ width: '20px', height: '20px', opacity: "3" }} />
                        </Button>
                    </InputRightElement>
                </InputGroup>

            </FormControl>
            <FormControl id='pic' isRequired>
                <FormLabel>Upload  Profile Picture:</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    placeholder=''
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorscheme="green"
                bg={"green.100"}
                color={"green"}
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}>
                Sign Up
            </Button>
        </VStack>
    );
}
