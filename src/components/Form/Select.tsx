import { FormControl, FormErrorMessage, FormLabel, Select as ChakraSelect, SelectProps as ChakraSelectProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  children: ReactNode;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({
  name, 
  label, 
  error=undefined, 
  children,
  maxW, 
  ...rest
}: SelectProps, ref) => {
  return (
    <FormControl isInvalid={!!error} maxW={maxW}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraSelect 
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
      >
        {children}
      </ChakraSelect>
      { !!error && <FormErrorMessage>{error.message}</FormErrorMessage> }
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)