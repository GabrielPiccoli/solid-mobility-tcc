import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";

type AddAddressFormData = {
  cep: string
  logradouro: string
  numero: number
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  pais: string
}

const AddAddressSchema = yup.object().shape({
  cep: yup.string().required('Cep obrigatório'),
  logradouro: yup.string().required('Logradouro obrigatório'),
  numero: yup.number().required('Número obrigatório'),
  complemento: yup.string(),
  bairro: yup.string().required('Bairro obrigatório'),
  cidade: yup.string().required('Cidade obrigatória'),
  uf: yup.string().required('Estado obrigatório'),
  pais: yup.string().required('País obrigatório'),
}) 

export default function AdicionarEndereco() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddAddressSchema)
  })

  const { errors } = formState
  const handleAddAddress: SubmitHandler<AddAddressFormData> = (values) => {
    console.log(values)
  }

  return (
    <Box>
      <Header />
      <Divider />
      <FlexContainer title="Adicionar Van" onSubmit={handleSubmit(handleAddAddress)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          <Input type="text" label="Cep" maxW={["100%", "48%"]} error={ errors.cep } {...register('cep')} />
          <Input type="text" label="Logradouro" maxW={["100%", "48%"]} error={ errors.logradouro } {...register('logradouro')} />
          <Input type="text" label="Número" maxW={["100%", "48%"]} error={ errors.numero } {...register('numero')} />
          <Input type="text" label="Complemento" maxW={["100%", "48%"]} error={ errors.complemento } {...register('complemento')} />
          <Input type="text" label="Bairro" maxW={["100%", "48%"]} error={ errors.bairro } {...register('bairro')} />
          <Input type="text" label="Cidade" maxW={["100%", "48%"]} error={ errors.cidade } {...register('cidade')} />
          <Input type="text" label="UF" maxW={["100%", "48%"]} error={ errors.uf } {...register('uf')} />
          <Input type="text" label="País" maxW={["100%", "48%"]} error={ errors.pais } {...register('pais')} />

          <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Salvar</Button>
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