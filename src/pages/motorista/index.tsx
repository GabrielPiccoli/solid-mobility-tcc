import { Box, Button, Divider, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useBreakpointValue } from "@chakra-ui/react"
import LinkNext from "next/link"
import { Header } from "../../components/Header"
import { Profile } from "../../components/Header/Profile"
import Sidebar from "../../components/Sidebar"
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import React from "react"

export default function Motorista() {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  return (
    <Box> 
      <Header />
      <Divider />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg">
              <Text as="span" color="blue.500">P</Text>assageiros
            </Heading>

            <LinkNext href="/passageiros/create" passHref>
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
          {isWideVersion ? (            
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th>Aluno</Th>
                  <Th>Ponto</Th>
                  <Th>Destino</Th>
                  <Th>Van</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td><Profile isLeft showProfileData={isWideVersion} /></Td>
                  <Td>
                    <Text>Rua Luiz Raseza, 700</Text>
                    <Text fontSize="sm" color="gray.500">Bloco 7, Apto 301</Text>
                  </Td>
                  <Td>
                    <Text>IFSP - Capivari</Text>
                  </Td>
                  <Td>
                    FJG-0380
                  </Td>
                  <Td>
                    <LinkNext href="/passageiros/create" passHref>
                      <Tooltip hasArrow label="Editar" bg="blue.500" color="black">
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="yellow"
                          textAlign="center"
                        >
                          <Icon as={AiOutlineEdit} fontSize="20" />
                        </Button>
                      </Tooltip>
                    </LinkNext>
                    <LinkNext href="/passageiros/create" passHref>
                      <Tooltip hasArrow label="Deletar" bg="blue.500" color="black">
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="red"
                          textAlign="center"
                          ml={4}
                        >
                          <Icon as={AiOutlineDelete} fontSize="20" />
                        </Button>
                      </Tooltip>
                    </LinkNext>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          ) : (
            <Box bg="gray.700" p="4" my="2" borderRadius="8" borderTopWidth={3} borderTopColor="blue.500">
              <Profile isLeft />
              <Divider mt="4" />
              <Table colorScheme="whiteAlpha">
                <Tbody>
                  <Tr>
                    <Td color="gray.400">Ponto</Td>
                    <Td>Rua Luiz Rasera, 700</Td>
                  </Tr>
                  <Tr>
                    <Td color="gray.400">Destino</Td>
                    <Td>IFSP - Capivari</Td>
                  </Tr>
                  <Tr>
                    <Td color="gray.400">Van</Td>
                    <Td>FJG0380</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Flex mt="4" justify="space-around">
              <LinkNext href="/passageiros/create" passHref>
                <Tooltip hasArrow label="Editar" bg="blue.500" color="black">
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="yellow"
                    textAlign="center"
                    leftIcon={<Icon as={AiOutlineEdit} fontSize="20" />}
                  >
                    Editar
                  </Button>
                </Tooltip>
              </LinkNext>
              <LinkNext href="/passageiros/create" passHref>
                <Tooltip hasArrow label="Deletar" bg="blue.500" color="black">
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="red"
                    textAlign="center"
                    ml={4}
                    leftIcon={<Icon as={AiOutlineDelete} fontSize="20" />}
                  >
                    Excluir
                  </Button>
                </Tooltip>
              </LinkNext>
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  )
}