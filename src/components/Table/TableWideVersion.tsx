import { Button, Icon, Table, TableProps, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useBreakpointValue } from "@chakra-ui/react";
import { Profile } from "../Header/Profile";
import LinkNext from 'next/link'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaRoute } from "react-icons/fa";

type bodyContent = {
  data: string[]
  id: string
}

interface TableWideVersion extends TableProps {
  headers: string[];
  bodyData: bodyContent[];
  editLink: string;
  deleteLink: string;
  showProfile?: boolean;
  isRoute?: boolean;
}

export function TableWideVersion({ 
  headers, 
  bodyData, 
  editLink, 
  deleteLink, 
  showProfile = true, 
  isRoute = false, 
  ...rest}: TableWideVersion) 
{
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
            <Td w={ isRoute ? "233px" : "155px"}>
              {isRoute && (
                <LinkNext href={`rotas/mapa/${body.id}`} passHref>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="blue"
                    textAlign="center"
                  >
                    <Icon as={FaRoute} fontSize="20" />
                  </Button>
                </LinkNext>
              )}
              <LinkNext href={`${editLink}/${body.id}`} passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="yellow"
                  textAlign="center"
                  ml={4}
                >
                  <Icon as={AiOutlineEdit} fontSize="20" />
                </Button>
              </LinkNext>
              <LinkNext href={`${deleteLink}/${body.id}`} passHref>
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
              </LinkNext>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}