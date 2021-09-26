import { Box, Button, Divider, Flex, Alert, AlertIcon, AlertTitle, CloseButton, Spinner } from "@chakra-ui/react";
import { FlexContainer } from "../../../components/FlexContainer";
import { Header } from "../../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../components/Form/Input";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../../services/apiClient";
import { Select } from "../../../components/Form/Select";
import { updatePassageiro } from "../../../services/passageiros/editarPassageiro";

type UpdatePassengerFormData = {
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

interface Passageiro extends UpdatePassengerFormData {
  id: string
  motorista_id: string
}

type EditarPassageiroProps = {
  params: {
    slug: string;
  }
}

const UpdatePassengerSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  cpf: yup.string().required('CPF obrigatório'),
  parada_id: yup.string().required('Ponto obrigatório'),
}) 

export default function EditarPassageiro({params}: EditarPassageiroProps) {
  const [alerta, setAlerta] = useState(false)
  const [passageiro, setPassageiro] = useState<Passageiro>()
  const [paradas, setParadas] = useState<Parada[]>()
  const id = params?.slug
  
  const { data, isLoading, error } = useQuery(['passageiro', id], async () => {
    const response = await api.get(`/passageiro/${id}`)
    const data = response.data
    setPassageiro(data)
    
    const paradasResponse = await api.get('/paradas')
    const paradasData = paradasResponse.data

    const enderecosResponse = await api.get('/enderecos')
    const enderecosData = enderecosResponse.data

    const newParadas = paradasData.map((parada: Parada) => ({
      ...parada,
      endereco: enderecosData.find((endereco: Endereco) => endereco.id === parada.endereco_id)
    }))

    setParadas(newParadas)

    return data
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UpdatePassengerSchema)
  })

  const { errors } = formState
  const handleEditPassenger: SubmitHandler<UpdatePassengerFormData> = async (values, e) => {
    const passageiroAtualizado = await updatePassageiro({
      id,
      ...values
    })

    if (!!passageiroAtualizado) {
      setAlerta(true)
    }
  }

  function closeAlert() {
    setAlerta(false)
  }

  return (
    <Box>
      <Header />
      <Divider />
      <FlexContainer title="Editar Passageiro" onSubmit={handleSubmit(handleEditPassenger)}>
        { isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
            {alerta && (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle mr={2} color="green.500">Passageiro atualizado com sucesso!</AlertTitle>
                <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <Input
              defaultValue={passageiro?.nome}
              type="text"
              label="Nome"
              maxW={["100%", "48%"]}
              error={ errors.nome }
              {...register('nome')} 
            />
            <Input
              defaultValue={passageiro?.email}
              type="email"
              label="E-mail"
              maxW={["100%", "48%"]}
              error={ errors.email }
              {...register('email')}
            />
            <Input
              defaultValue={passageiro?.cpf}
              type="text"
              label="CPF"
              maxW={["100%", "48%"]}
              error={ errors.cpf }
              {...register('cpf')} 
            />
            <Select label="Ponto" maxW={["100%", "48%"]} error={ errors.parada_id } {...register('parada_id')}>
              <option value="">Selecione um Ponto</option>
              {paradas?.map((parada) => (
                <option
                  selected={parada.id === passageiro?.parada_id}
                  value={parada.id}
                  key={parada.id}
                >
                  {parada.endereco.logradouro}, {parada.endereco.numero.toString()}
                </option>
              ))}
            </Select>

            <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Salvar</Button>
          </Flex>
        )}
      </FlexContainer>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {
      params: ctx.params
    }
  }
})