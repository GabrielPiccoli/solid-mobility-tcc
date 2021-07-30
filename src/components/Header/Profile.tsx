import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gabriel Piccoli</Text>
          <Text color="blue.500" fontSize="small">gabriel.pdmarcos@gmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Gabriel Piccoli" src="https://github.com/GabrielPiccoli.png" />
    </Flex>
  )
}