import { Box, Button, Divider, Flex, Icon, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { Profile } from "../Header/Profile";
import LinkNext from 'next/link'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaRoute } from "react-icons/fa";

interface TableMobileVersion { 
  data: string[]
  headers: string[]
  editLink: string
  deleteLink: string
  showProfile?: boolean
  isRoute?: boolean
  routeId?: string
}

export function TableMobileVersion({
  data, 
  headers, 
  editLink, 
  deleteLink, 
  showProfile = true, 
  isRoute = false,
  routeId = ""
}: TableMobileVersion) {
  return (
    <Box bg="gray.700" p="4" my="2" borderRadius="8" borderTopWidth={3} borderTopColor="blue.500">
      {showProfile && <Profile isLeft />}
      <Divider mt="4" />
      <Table colorScheme="whiteAlpha">
        <Tbody>
          {data.map((content, i) => (
            <Tr key={i}>
              <Td color="gray.400">{headers[i]}</Td>
              <Td>{content}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex mt="4" justify="space-around">
        {isRoute && (
          <LinkNext href={`rotas/mapa/${routeId}`} passHref>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="blue"
              textAlign="center"
              leftIcon={<Icon as={FaRoute} fontSize="20" />}
            >
              Rota
            </Button>
          </LinkNext>
        )}
        <LinkNext href={editLink} passHref>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="yellow"
            textAlign="center"
            leftIcon={<Icon as={AiOutlineEdit} fontSize="20" />}
            ml={2}
          >
            Editar
          </Button>
        </LinkNext>
        <LinkNext href={deleteLink} passHref>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="red"
            textAlign="center"
            ml={2}
            leftIcon={<Icon as={AiOutlineDelete} fontSize="20" />}
          >
            Excluir
          </Button>
        </LinkNext>
      </Flex>
    </Box>
  )
}