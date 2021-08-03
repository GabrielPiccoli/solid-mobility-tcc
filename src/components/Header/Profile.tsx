import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean
  isLeft?: boolean
}

export function Profile({ showProfileData = true, isLeft = false}: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" ml={isLeft ? "4" : "0"} textAlign={isLeft ? "left" : "right"} order={1}>
          <Text>Gabriel Piccoli</Text>
          <Text color="blue.500" fontSize="small">gabriel.pdmarcos@gmail.com</Text>
        </Box>
      )}

      <Avatar order={isLeft ? 0 : 2} size="md" name="Gabriel Piccoli" src="https://github.com/GabrielPiccoli.png" />
    </Flex>
  )
}