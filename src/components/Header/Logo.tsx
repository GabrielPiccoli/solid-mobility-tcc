import { Heading, Text } from "@chakra-ui/react";

export function Logo() {
  return(
    <Heading
      as="h1"
      fontSize={["2xl", "4xl"]}
      fontWeight="bold"
      w="64"
    >
      <Text as="span" color="blue.500">S</Text>olid <Text as="span" color="blue.500">M</Text>obility
    </Heading>
  )
}