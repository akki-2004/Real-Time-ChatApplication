import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export default function ProfileModal({user,children}) {
    const {isOpen,onOpen,onClose}=useDisclosure();

  return (
    <>
      <span onClick={onOpen}>{children}</span>
        
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={'30px'}
          fontFamily={'Work sans'}
          d={'flex'}
          justifyContent={'center'}
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <Image
            borderRaduis={"full"}
            boxSize={"150px"}
            src={"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
            alt={user.name}
            />
                
                
           <h1>Email:</h1> <span>{user.email}</span>
           <h1>Name:</h1> <span>{user.name}</span>
           {/* <h1>Email:</h1> <span>{user.pic}</span> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
