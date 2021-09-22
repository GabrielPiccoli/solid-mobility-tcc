import { Avatar, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AuthContext, signOut } from "../../contexts/AuthContext";

type User = {
  email: string;
  nome: string;
}

interface ProfileProps {
  showProfileData?: boolean
  isLeft?: boolean
  profileUser: User
}

export function Profile({ showProfileData = true, isLeft = false, profileUser }: ProfileProps) {  
  return (
    <Flex align="center">
      <Box mr="4" ml={isLeft ? "4" : "0"} textAlign={isLeft ? "left" : "right"} order={1}>
        <Text>{profileUser?.nome}</Text>
        { showProfileData && (
          <Text color="blue.500" fontSize="small">{profileUser?.email}</Text>
          )}
      </Box>
      <IconButton
        as={AiOutlinePoweroff}
        aria-label="sair"
        order={2}
        colorScheme="red"
        borderRadius="50%"
        variant="ghost"
        size="xs"
        p={0.5}
        onClick={signOut} 
      />
    </Flex>
  )
}