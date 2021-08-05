import { Button, Icon, Table, TableProps, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useBreakpointValue } from "@chakra-ui/react";
import { Profile } from "../Header/Profile";
import LinkNext from 'next/link'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

type bodyContent = {
  data: string[]
}

interface TableWideVersion extends TableProps {
  headers: string[];
  bodyData: bodyContent[];
  editLink: string;
  deleteLink: string;
  showProfile?: boolean;
}

export function TableWideVersion({ headers, bodyData, editLink, deleteLink, showProfile = true, ...rest}: TableWideVersion) {
  return (
    <Table colorScheme="whiteAlpha" {...rest}>
      <Thead>
        <Tr>
          {headers.map((header, i) => (
            <Th key={i}>{header}</Th>
          ))}
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {bodyData.map((body, i) => (
          <Tr key={i}>
            {showProfile && <Td><Profile isLeft showProfileData={true} /></Td>}
            {body.data.map((content, j) => (
              <Td key={j}><Text>{content}</Text></Td>
            ))}
            <Td w="155px">
              <LinkNext href={editLink} passHref>
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
              <LinkNext href={deleteLink} passHref>
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
        ))}
      </Tbody>
    </Table>
  )
}