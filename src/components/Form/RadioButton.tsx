import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";

interface RadioButtonProps extends UseRadioProps {
  children: string;
}

export function RadioButton(props: RadioButtonProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" w="150px" textAlign="center">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        boxShadow="md"
        borderColor="blue.500"
        color="white"
        fontFamily='heading'
        _checked={{
          bg: "blue.500",
          fontWeight: '600',
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}