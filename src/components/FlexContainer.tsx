import { Box, Button, Flex, FlexProps, Icon, useBreakpointValue } from "@chakra-ui/react";
import Sidebar from './Sidebar'
import { Title } from "./Title";
import LinkNext from 'next/link'
import { AiOutlinePlus } from "react-icons/ai";
import { ReactElement } from "react";

interface FlexContainerProps extends FlexProps {
  title: string
  createLink: string
  children: ReactElement
}

export function FlexContainer({ title, createLink, children, ...rest}: FlexContainerProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  return (
    <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" {...rest}>
      <Sidebar />
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Title text={title} />

          <LinkNext href={createLink} passHref>
            { isWideVersion ? (
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={AiOutlinePlus} fontSize="20" />}
              >
                Adicionar
              </Button>
            ) : (
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                >
                <Icon as={AiOutlinePlus} fontSize="20" />
              </Button>
            )}
          </LinkNext>
        </Flex>
        {children}
      </Box>
    </Flex>
  )
}