import { Box, Button, Divider, Flex, Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useQuery } from "react-query";
import { api } from "../../services/apiClient";
import { useState } from "react";
import { createPassageiro } from "../../services/passageiros/adicionarPassageiro";

type AddPassengerFormData = {
  nome: string
  email: string
  cpf: string
  parada_id: string
}

type Endereco = {
  id: string
  logradouro: string
  numero: number
}

type Parada = {
  id: string
  endereco_id: string
  endereco: Endereco
}

const AddPassengerSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  cpf: yup.string().required('CPF obrigatório'),
  parada_id: yup.string().required('Ponto obrigatório'),
}) 

export default function AdicionarPassageiro() {
  const [paradas, setParadas] = useState<Parada[]>()
  const [alerta, setAlerta] = useState(false)
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddPassengerSchema)
  })

  const { data, isLoading, error } = useQuery('paradas-passageiros', async () => {
    const paradasResponse = await api.get('/paradas')
    const paradasData = paradasResponse.data

    const enderecosResponse = await api.get('/enderecos')
    const enderecosData = enderecosResponse.data

    const newParadas = paradasData.map((parada: Parada) => ({
      ...parada,
      endereco: enderecosData.find((endereco: Endereco) => endereco.id === parada.endereco_id)
    }))

    setParadas(newParadas)
    
    return newParadas
  })

  const { errors } = formState
  const handleAddPassenger: SubmitHandler<AddPassengerFormData> = async (values, e) => {
    const passageiroAdicionado = await createPassageiro(values)

    if (!!passageiroAdicionado) {
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
      <FlexContainer title="Adicionar Passageiro" onSubmit={handleSubmit(handleAddPassenger)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          {alerta && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle mr={2} color="green.500">Passageiro cadastrado com sucesso!</AlertTitle>
              <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
            </Alert>
          )}
          <Input type="text" label="Nome" maxW={["100%", "48%"]} error={ errors.nome } {...register('nome')} />
          <Input type="email" label="E-mail" maxW={["100%", "48%"]} error={ errors.email } {...register('email')} />
          <Input type="text" label="CPF" maxW={["100%", "48%"]} error={ errors.cpf } {...register('cpf')} />
          <Select label="Ponto" maxW={["100%", "48%"]} error={ errors.parada_id } {...register('parada_id')}>
            <option value="">Selecione um Ponto</option>
            {paradas?.map((parada) => (
              <option value={parada.id} key={parada.id}>{parada.endereco.logradouro}, {parada.endereco.numero.toString()}</option>
            ))}
          </Select>

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