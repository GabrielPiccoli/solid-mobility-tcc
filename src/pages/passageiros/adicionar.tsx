import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";

type AddPassengerFormData = {
  nome: String
  cpf: String
  email: String
  nascimento: Date
  ponto: Number
  destino: Number
}

const AddPassengerSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  cpf: yup.string().required('CPF obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  nascimento: yup.date().required('Date de nascimento obrigatória'),
  ponto: yup.number().required('Ponto obrigatório'),
  destino: yup.number().required('Destino obrigatório')
}) 

export default function AdicionarPassageiro() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddPassengerSchema)
  })

  const { errors } = formState
  const handleAddPassenger: SubmitHandler<AddPassengerFormData> = (values) => {
    console.log(values)
  }

  return (
    <Box>
      <Header />
      <Divider />
      <FlexContainer title="Adicionar Passageiro" onSubmit={handleSubmit(handleAddPassenger)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          <Input type="text" label="Nome" maxW={["100%", "48%"]} error={ errors.nome } {...register('nome')} />
          <Input type="text" label="CPF" maxW={["100%", "48%"]} error={ errors.cpf } {...register('cpf')} />
          <Input type="email" label="E-mail" maxW={["100%", "48%"]} error={ errors.email } {...register('email')} />
          <Input type="date" label="Data de Nascimento" maxW={["100%", "48%"]} error={ errors.nascimento } {...register('nascimento')} />
          <Input type="text" label="Ponto" maxW={["100%", "48%"]} error={ errors.ponto } {...register('ponto')} />
          <Input type="text" label="Destino" maxW={["100%", "48%"]} error={ errors.destino } {...register('destino')} />

          <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Salvar</Button>
        </Flex>
      </FlexContainer>
    </Box>
  )
}