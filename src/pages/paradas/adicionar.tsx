import { Box, Button, Divider, Flex, Alert, AlertIcon, AlertTitle, CloseButton, Checkbox } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../services/apiClient";
import { Select } from "../../components/Form/Select";
import { createParada } from "../../services/paradas/adicionarParada";

type AddStopFormData = {
  endereco_id: string
  rota_id: string
  ponto_partida?: boolean
  ponto_final?: boolean
}

type Rota = {
  id: string
  descricao: string
}

type Endereco = {
  id: string
  logradouro: string
  numero: number
}

const AddStopSchema = yup.object().shape({
  endereco_id: yup.string().required('Endereço obrigatório'),
  rota_id: yup.string().required('Rota obrigatória'),
  ponto_partida: yup.boolean(),
  ponto_final: yup.boolean(),
}) 

export default function AdicionarParada() {
  const [rotas, setRotas] = useState<Rota[]>()
  const [enderecos, setEnderecos] = useState<Endereco[]>()
  const [alerta, setAlerta] = useState(false)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddStopSchema)
  })

  const { data, isLoading, error } = useQuery('rotas-enderecos', async () => {
    const rotasResponse = await api.get('/rotas')
    const rotasData = rotasResponse.data
    setRotas(rotasData)

    const enderecosResponse = await api.get('/enderecos')
    const enderecosData = enderecosResponse.data
    setEnderecos(enderecosData)

    return {
      rotas: rotasData,
      enderecos: enderecosData
    }
  })

  const { errors } = formState
  const handleAddStop: SubmitHandler<AddStopFormData> = async (values, e) => {
    const paradaAdicionada = await createParada(values)
    console.log(values)

    if (!!paradaAdicionada) {
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
      <FlexContainer title="Adicionar Parada" onSubmit={handleSubmit(handleAddStop)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          {alerta && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle mr={2} color="green.500">Parada cadastrada com sucesso!</AlertTitle>
              <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
            </Alert>
          )}
          <Select label="Rota" maxW={["100%", "48%"]} error={ errors.rota_id } {...register('rota_id')}>
            <option value="">Selecione uma Rota</option>
            {rotas?.map((rota, i) => (
              <option value={rota.id} key={rota.id}>{rota.descricao}</option>
            ))}
          </Select>
          <Select label="Endereço" maxW={["100%", "48%"]} error={ errors.endereco_id } {...register('endereco_id')}>
            <option value="">Selecione um Endereço</option>
            {enderecos?.map((endereco, i) => (
              <option value={endereco.id} key={endereco.id}>{endereco.logradouro}, {endereco.numero.toString()}</option>
            ))}
          </Select>
          <Checkbox size="lg" colorScheme="blue" my="4" w={["100%", "48%"]} error={ errors.ponto_partida } {...register('ponto_partida')}>
            Ponto de Partida
          </Checkbox>
          <Checkbox size="lg" colorScheme="blue"  my="4" w={["100%", "48%"]} error={ errors.ponto_final } {...register('ponto_final')}>
            Ponto de Chegada
          </Checkbox>
          
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