import { HStack, Icon } from '@chakra-ui/react'
import { AiOutlineBell } from 'react-icons/ai'

export function NotificationNav() {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6","8"]}
      pr={["6","8"]}
      py="1"
      color="blue.400"
      borderRightWidth={1}
      borderColor="gray.500"
    >
      <Icon as={AiOutlineBell} fontSize="20" />
    </HStack>
  )
}