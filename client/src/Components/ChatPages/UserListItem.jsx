import { Box, Text } from '@chakra-ui/react';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="gray.100"
      px={3}
      py={2}
      borderRadius="lg"
      _hover={{ backgroundColor: 'gray.200' }}
    >
      <Text>{user.name}</Text>  {/* Display the user's name */}
      <Text fontSize="xs">
        <b>Email:</b> {user.email}  {/* Optionally display email */}
      </Text>
    </Box>
  );
};

export default UserListItem;
