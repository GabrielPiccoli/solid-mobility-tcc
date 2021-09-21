import { Box, Button, Divider, Flex, Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { createEndereco } from "../../services/enderecos/adicionarEndereco";
import { useState } from "react";

type AddAddressFormData = {
  logradouro: string
  numero: number
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

const AddAddressSchema = yup.object().shape({
  logradouro: yup.string().required('Logradouro obrigatório'),
  numero: yup.number().required('Número obrigatório'),
  complemento: yup.string(),
  bairro: yup.string().required('Bairro obrigatório'),
  cidade: yup.string().required('Cidade obrigatória'),
  estado: yup.string().required('Estado obrigatório'),
  cep: yup.string().required('Cep obrigatório')
}) 

export default function AdicionarEndereco() {
  const [alerta, setAlerta] = useState(false)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddAddressSchema)
  })

  const { errors } = formState
  const handleAddAddress: SubmitHandler<AddAddressFormData> = async (values, e) => {
    const enderecoAdicionado = await createEndereco(values)

    if (!!enderecoAdicionado) {
      setAlerta(true)
    }
    e?.target.reset()
  }

  function closeAlert() {
    setAlerta(false)
  }

  return (
    <Box>
      <Header />
      <Divider />
      <FlexContainer title="Adicionar Endereço" onSubmit={handleSubmit(handleAddAddress)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          {alerta && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle mr={2} color="green.500">Endereço cadastrado com sucesso!</AlertTitle>
              <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
            </Alert>
          )}
          <Input type="text" label="Cep" maxW={["100%", "48%"]} error={ errors.cep } {...register('cep')} />
          <Input type="text" label="Logradouro" maxW={["100%", "48%"]} error={ errors.logradouro } {...register('logradouro')} />
          <Input type="text" label="Número" maxW={["100%", "48%"]} error={ errors.numero } {...register('numero')} />
          <Input type="text" label="Complemento" maxW={["100%", "48%"]} error={ errors.complemento } {...register('complemento')} />
          <Input type="text" label="Bairro" maxW={["100%", "48%"]} error={ errors.bairro } {...register('bairro')} />
          <Input type="text" label="Cidade" maxW={["100%", "48%"]} error={ errors.cidade } {...register('cidade')} />
          <Input type="text" label="Estado" maxW={["100%", "48%"]} error={ errors.estado } {...register('estado')} />
          
          <Flex w="100%">
            <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Salvar</Button>
          </Flex>
        </Flex>
      </FlexContainer>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})