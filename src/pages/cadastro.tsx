import { Button, Flex, Image, Stack, Link, Divider, Text, Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from "../components/Form/Input";
import { AuthContext } from "../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { withSSRGuest } from "../utils/withSSRGuest";
import { createMotorista } from "../services/motoristas/adicionarMotorista";
import router from "next/router";

type SignUpFormData = {
  nome: string
  email: string
  cnh: string
  senha: string
}

const signUpFormSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  cnh: yup.string().required('CNH obrigatória'),
  senha: yup.string().required('Senha obrigatória')
})

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })
  const { errors } = formState
  const handleSignUp: SubmitHandler<SignUpFormData> = async (values, e) => {
    const motoristaAdicionado = await createMotorista(values)
    e?.target.reset()
    router.push('/')
  }

  return (
    <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" justify="center" direction="column" align="center">
      <Image src="./images/logo.png" maxW="300px" />

      <Flex as="form" w="300px" flexDir="column" onSubmit={handleSubmit(handleSignUp)}>
        <Stack mt="4" spacing="4">
          <Input type="text" label="Nome" error={errors.nome} {...register('nome')} />
          <Input type="email" label="E-mail" error={errors.email} {...register('email')} />
          <Input type="text" label="CNH" error={errors.cnh} {...register('cnh')} />
          <Input type="password" label="Senha" error={errors.senha} {...register('senha')} />
        </Stack>

        <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Cadastrar</Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})