import { Box, Button, Divider, Flex, Icon, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { Profile } from "../Header/Profile";
import LinkNext from 'next/link'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface TableMobileVersion { 
  data: string[]
  headers: string[]
  editLink: string
  deleteLink: string
  showProfile?: boolean
}

export function TableMobileVersion({data, headers, editLink, deleteLink, showProfile = true}: TableMobileVersion) {
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
      <LinkNext href={editLink} passHref>
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
      </LinkNext>
      <LinkNext href={deleteLink} passHref>
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
      </LinkNext>
      </Flex>
    </Box>
  )
}