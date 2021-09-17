import { Button, Flex, HStack, Image, Stack, useRadioGroup } from "@chakra-ui/react";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RadioButton } from "../components/Form/RadioButton";
import { Input } from "../components/Form/Input";
import { AuthContext } from "../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { withSSRGuest } from "../utils/withSSRGuest";

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { signIn } = useContext(AuthContext)
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors } = formState
  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values)
  }

  return (
    <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" justify="center" direction="column" align="center">
      <Image src="./images/logo.png" maxW="300px" />

      <Flex as="form" w="300px" flexDir="column" onSubmit={handleSubmit(handleSignIn)}>
        <Stack mt="4" spacing="4">
          <Input type="email" label="E-mail" error={errors.email} {...register('email')} />
          <Input type="password" label="Senha" error={errors.password} {...register('password')} />
        </Stack>

        <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Entrar</Button>
      </Flex>

    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})