import { Flex, Icon, IconButton, Image, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { AiOutlineMenu } from 'react-icons/ai'
import { NotificationNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { Logo } from "./Logo";

export function Header() {
  const { onOpen } = useSidebarDrawer()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return(
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="0"
      px="6"
      align="center"
      // bg="gray.700"
      boxShadow=""
    >
      {!isWideVersion && (
        <IconButton 
          aria-label="Abrir Navegação"
          icon={<Icon as={AiOutlineMenu} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}

      <Logo />

      <Flex align="center" ml="auto">
        <NotificationNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}