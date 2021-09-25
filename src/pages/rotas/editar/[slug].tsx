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
import { updateRota } from "../../../services/rotas/editarRota";
import { Select } from "../../../components/Form/Select";

type UpdateRotaFormData = {
  descricao: string
  van_id: string
}

interface Rota extends UpdateRotaFormData {
  id: string
  motorista_id: string
}

type Van = {
  id: string
  placa: string
  lotacao: number
  marca: string
}

type EditarRotaProps = {
  params: {
    slug: string;
  }
}

const UpdateRotaSchema = yup.object().shape({
  descricao: yup.string().required('Descrição obrigatória'),
  van_id: yup.string().required('Van obrigatória')
}) 

export default function EditarRota({params}: EditarRotaProps) {
  const [alerta, setAlerta] = useState(false)
  const [rota, setRota] = useState<Rota>()
  const [vans, setVans] = useState<Van[]>()
  const id = params?.slug
  
  const { data, isLoading, error } = useQuery(['rota', id], async () => {
    const response = await api.get(`/rota/${id}`)
    const data = response.data
    setRota(data)

    const vansResponse = await api.get('/vans')
    const vansData = vansResponse.data
    setVans(vansData)
        
    return data
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UpdateRotaSchema)
  })

  const { errors } = formState
  const handleEditRota: SubmitHandler<UpdateRotaFormData> = async (values, e) => {
    const rotaAtualizada = await updateRota({
      id,
      ...values
    })

    if (!!rotaAtualizada) {
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
      <FlexContainer title="Editar Rota" onSubmit={handleSubmit(handleEditRota)}>
        { isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
            {alerta && (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle mr={2} color="green.500">Rota atualizada com sucesso!</AlertTitle>
                <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <Input defaultValue={rota?.descricao} type="text" label="Descrição" maxW={["100%", "48%"]} error={ errors.descricao } {...register('descricao')} />
            <Select label="Van" maxW={["100%", "48%"]} error={ errors.van_id } {...register('van_id')}>
              <option value="">Selecione uma Van</option>
              {vans?.map((van, i) => (
                <option selected={van.id === rota?.van_id ? true : false} value={van.id} key={i}>{van.placa}</option>
              ))}
            </Select>

            <Flex w="100%">
              <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Salvar</Button>
            </Flex>
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