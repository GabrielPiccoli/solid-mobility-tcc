import { Heading, HeadingProps, Text } from "@chakra-ui/react";

interface TitleProps extends HeadingProps {
  text: string;
}

export function Title({ text, ...rest}: TitleProps) {
  const words = text.split(' ')
  let firstLetters: String[] = []
  const restOfWords: String[] = []
  words.forEach(word => {
    firstLetters.push(word.substr(0, 1))
    restOfWords.push(word.substr(1))
  })
  return (
    <Heading size="lg" {...rest}>
      {words.map((word, i) => (
          <>
            <Text as="span" key={i} color="blue.500">{firstLetters[i]}</Text>
            {restOfWords[i]}
            { i < (words.length - 1) && " "}
          </>
      ))}
    </Heading>
  )
}