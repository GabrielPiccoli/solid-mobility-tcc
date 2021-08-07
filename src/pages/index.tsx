import { Button, Flex, HStack, Image, Stack, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RadioButton } from "../components/Form/RadioButton";
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors } = formState
  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))    
    console.log(values)
  }

  const options = ["Motorista", "Passageiro"]
  const { getRadioProps } = useRadioGroup({
    name: "tipousuario",
    defaultValue: "Motorista",
  })
  
  return (
    <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" justify="center" direction="column" align="center">
      <Image src="./images/logo.png" maxW="300px" />

      <Flex as="form" w="300px" flexDir="column" onSubmit={handleSubmit(handleSignIn)}>
        <HStack spacing="0" mt={3}>
          {options.map((value) => {
            const radio = getRadioProps({ value })
            return (
              <RadioButton key={value} {...radio}>
                {value}
              </RadioButton>
            )
          })}
        </HStack>
        <Stack mt="4" spacing="4">
          <Input type="email" label="E-mail" error={errors.email} {...register('email')} />
          <Input type="password" label="Senha" error={errors.password} {...register('password')} />
        </Stack>

        <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Entrar</Button>
      </Flex>

    </Flex>
  )
}
