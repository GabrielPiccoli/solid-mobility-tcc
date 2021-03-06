import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, error=undefined, maxW, ...rest}: InputProps, ref) => {
  return (
    <FormControl isInvalid={!!error} maxW={maxW}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraInput 
        name={name} 
        id={name}
        focusBorderColor="blue.500"  
        variant="outline"
        _hover={{
          borderColor: 'blue.500'
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
      { !!error && <FormErrorMessage>{error.message}</FormErrorMessage> }
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)