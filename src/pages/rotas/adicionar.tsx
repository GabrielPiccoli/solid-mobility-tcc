import { Box, Button, Divider, Flex, Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";
import { ChangeEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useQuery } from "react-query";
import { api } from "../../services/apiClient";
import { createRota } from "../../services/rotas/adicionarRota";

type AddRouteFormData = {
  descricao: string
  van_id: string
}

type Van = {
  id: string
  placa: string
  lotacao: number
  marca: string
}

const AddRouteSchema = yup.object().shape({
  descricao: yup.string().required('Descrição obrigatória'),
  van_id: yup.string().required('Van obrigatória'),
}) 

export default function AdicionarRota() {
  const [vans, setVans] = useState<Van[]>()
  const [alerta, setAlerta] = useState(false)
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddRouteSchema)
  })

  const { data, isLoading, error } = useQuery('vans', async () => {
    const response = await api.get('/vans')
    const data = response.data
    setVans(data)

    return data
  })

  const { errors } = formState
  const handleAddRoute: SubmitHandler<AddRouteFormData> = async (values, e) => {
    const rotaAdicionada = await createRota(values)

    if (!!rotaAdicionada) {
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
      <FlexContainer title="Adicionar Rota" onSubmit={handleSubmit(handleAddRoute)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          {alerta && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle mr={2} color="green.500">Rota cadastrada com sucesso!</AlertTitle>
              <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
            </Alert>
          )}
          <Input type="text" label="Descrição" maxW={["100%", "48%"]} error={ errors.descricao } {...register('descricao')} />
          <Select label="Van" maxW={["100%", "48%"]} error={ errors.van_id } {...register('van_id')}>
            <option value="">Selecione uma Van</option>
            {vans?.map((van, i) => (
              <option value={van.id} key={i}>{van.placa}</option>
            ))}
          </Select>
          
          <Box w="100%">
            <Button type="submit"  colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Salvar</Button>
          </Box>
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