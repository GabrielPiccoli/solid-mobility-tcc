import { Box, Button, Divider, Flex, Icon, useBreakpointValue } from "@chakra-ui/react"
import LinkNext from "next/link"
import { Header } from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { AiOutlinePlus } from 'react-icons/ai'
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { Title } from "../../components/Title"

export default function Motorista() {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const headersWideVersion = ["Motorista"]
  const bodyContentWideVersion = [
    {data: []},
    {data: []}
  ]
  const bodyContentMobileVersion = [
    { title: '', content: ''},
  ]

  return (
    <Box> 
      <Header />
      <Divider />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Title text="Motoristas" />

            <LinkNext href="/motoristas/adicionar" passHref>
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
            <TableWideVersion 
              headers={headersWideVersion} 
              bodyData={bodyContentWideVersion}
              editLink="/passageiros/editar"
              deleteLink="/passageiros/excluir"
            />         
          ) : (
            <TableMobileVersion
              data={bodyContentMobileVersion}
              editLink="/passageiros/editar"
              deleteLink="/passageiros/excluir"
            />
          )}
        </Box>
      </Flex>
    </Box>
  )
}