import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";

type AddDriverFormData = {
  nome: string
  cpf: string
  email: string
  nascimento: Date
  cnh: string
  categoriaCnh: string
}

const AddDriverSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  cpf: yup.string().required('CPF obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  nascimento: yup.date().required('Date de nascimento obrigatória'),
  cnh: yup.string().required('CNH obrigatória'),
  categoriaCnh: yup.string().required('Categoria da CNH obrigatória')
}) 

export default function AdicionarMotorista() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddDriverSchema)
  })

  const { errors } = formState
  const handleAddDriver: SubmitHandler<AddDriverFormData> = (values) => {
    console.log(values)
  }

  return (
    <Box>
      <Header />
      <Divider />
      <FlexContainer title="Adicionar Motorista" onSubmit={handleSubmit(handleAddDriver)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          <Input type="text" label="Nome" maxW={["100%", "48%"]} error={ errors.nome } {...register('nome')} />
          <Input type="text" label="CPF" maxW={["100%", "48%"]} error={ errors.cpf } {...register('cpf')} />
          <Input type="email" label="E-mail" maxW={["100%", "48%"]} error={ errors.email } {...register('email')} />
          <Input type="date" label="Data de Nascimento" maxW={["100%", "48%"]} error={ errors.nascimento } {...register('nascimento')} />
          <Input type="text" label="CNH" maxW={["100%", "48%"]} error={ errors.cnh } {...register('cnh')} />
          <Input type="text" label="Categoria CNH" maxW={["100%", "48%"]} error={ errors.categoriaCnh } {...register('categoriaCnh')} />

          <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Salvar</Button>
        </Flex>
      </FlexContainer>
    </Box>
  )
}