import { Box, Button, Divider, Flex, Alert, AlertIcon, AlertTitle, CloseButton, Spinner, Checkbox } from "@chakra-ui/react";
import { FlexContainer } from "../../../components/FlexContainer";
import { Header } from "../../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../components/Form/Input";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../../services/apiClient";
import { updateParada } from "../../../services/paradas/editarParada";
import { Select } from "../../../components/Form/Select";

type UpdateStopFormData = {
  endereco_id: string
  rota_id: string
  ponto_partida: boolean
  ponto_final: boolean
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

interface Parada extends UpdateStopFormData {
  id: string
  motorista_id: string
}

type EditarParadaProps = {
  params: {
    slug: string;
  }
}

const UpdateStopSchema = yup.object().shape({
  endereco_id: yup.string().required('Endereço obrigatório'),
  rota_id: yup.string().required('Rota obrigatória'),
  ponto_partida: yup.boolean(),
  ponto_final: yup.boolean(),
}) 

export default function EditarParada({params}: EditarParadaProps) {
  const [alerta, setAlerta] = useState(false)
  const [parada, setParada] = useState<Parada>()
  const [rotas, setRotas] = useState<Rota[]>()
  const [enderecos, setEnderecos] = useState<Endereco[]>()
  const id = params?.slug
  
  const { data, isLoading, error } = useQuery(['parada', id], async () => {
    const response = await api.get(`/parada/${id}`)
    const data = response.data
    setParada(data)
    
    const rotasResponse = await api.get('/rotas')
    const rotasData = rotasResponse.data
    setRotas(rotasData)

    const enderecosResponse = await api.get('/enderecos')
    const enderecosData = enderecosResponse.data
    setEnderecos(enderecosData)

    return data
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UpdateStopSchema)
  })

  const { errors } = formState
  const handleEditStop: SubmitHandler<UpdateStopFormData> = async (values, e) => {
    const paradaAtualizada = await updateParada({
      id,
      ...values
    })

    if (!!paradaAtualizada) {
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
      <FlexContainer title="Editar Parada" onSubmit={handleSubmit(handleEditStop)}>
        { isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
            {alerta && (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle mr={2} color="green.500">Parada atualizada com sucesso!</AlertTitle>
                <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <Select label="Rota" maxW={["100%", "48%"]} error={ errors.rota_id } {...register('rota_id')}>
              <option value="">Selecione uma Rota</option>
              {rotas?.map((rota, i) => (
                <option selected={rota.id === parada?.rota_id} value={rota.id} key={rota.id}>{rota.descricao}</option>
              ))}
            </Select>
            <Select label="Endereço" maxW={["100%", "48%"]} error={ errors.endereco_id } {...register('endereco_id')}>
              <option value="">Selecione um Endereço</option>
              {enderecos?.map((endereco, i) => (
                <option selected={endereco.id === parada?.endereco_id} value={endereco.id} key={endereco.id}>{endereco.logradouro}, {endereco.numero.toString()}</option>
              ))}
            </Select>
            { parada?.ponto_partida ? (
              <Checkbox
                size="lg"
                defaultIsChecked
                colorScheme="blue"
                my="4"
                w={["100%", "48%"]}
                error={errors.ponto_partida}
                {...register('ponto_partida')}
              >
                Ponto de Partida
              </Checkbox>
            ) : (
              <Checkbox
                size="lg"
                colorScheme="blue"
                my="4"
                w={["100%", "48%"]}
                error={errors.ponto_partida}
                {...register('ponto_partida')}
              >
                Ponto de Partida
              </Checkbox>
            ) }
            { parada?.ponto_final ? (
              <Checkbox
                size="lg"
                defaultIsChecked
                checked={parada?.ponto_final}
                colorScheme="blue"
                my="4"
                w={["100%", "48%"]}
                error={errors.ponto_final}
                {...register('ponto_final')}
              >
                Ponto de Chegada
              </Checkbox>
            ) : (
              <Checkbox
                size="lg"
                checked={parada?.ponto_final}
                colorScheme="blue"
                my="4"
                w={["100%", "48%"]}
                error={errors.ponto_final}
                {...register('ponto_final')}
              >
                Ponto de Chegada
              </Checkbox>
            ) }

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