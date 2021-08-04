import { Heading, HeadingProps, Text } from "@chakra-ui/react";

interface TitleProps extends HeadingProps {
  text: string;
}

export function Title({ text, ...rest}: TitleProps) {
  const firstLetter = text.substr(0, 1)
  const restOfWord = text.substr(1)
  return (
    <Heading size="lg" {...rest}>
      <Text as="span" color="blue.500">{firstLetter}</Text>{restOfWord}
    </Heading>
  )
}