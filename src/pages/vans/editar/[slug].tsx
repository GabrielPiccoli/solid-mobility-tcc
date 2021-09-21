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
import { updateVan } from "../../../services/vans/editarVan";

type UpdateVanFormData = {
  placa: string
  lotacao: number
  marca: string
}

interface Van extends UpdateVanFormData {
  id: string
  motorista_id: string
}

type EditarVanProps = {
  params: {
    slug: string;
  }
}

const UpdateVanSchema = yup.object().shape({
  placa: yup.string().required('Placa obrigatória'),
  lotacao: yup.number().required('Lotação obrigatória'),
  marca: yup.string().required('Marca obrigatória')
}) 

export default function EditarVan({params}: EditarVanProps) {
  const [alerta, setAlerta] = useState(false)
  const [van, setVan] = useState<Van>()
  const id = params?.slug
  
  const { data, isLoading, error } = useQuery(['van', id], async () => {
    const response = await api.get(`/van/${id}`)
    const data = response.data
    setVan(data)

    return data
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UpdateVanSchema)
  })

  const { errors } = formState
  const handleEditVan: SubmitHandler<UpdateVanFormData> = async (values, e) => {
    const vanAtualizada = await updateVan({
      id,
      ...values
    })

    if (!!vanAtualizada) {
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
      <FlexContainer title="Editar Van" onSubmit={handleSubmit(handleEditVan)}>
        { isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
            {alerta && (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle mr={2} color="green.500">Van atualizada com sucesso!</AlertTitle>
                <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <Input defaultValue={van?.placa} type="text" label="Placa" maxW={["100%", "48%"]} error={ errors.placa } {...register('placa')} />
            <Input defaultValue={van?.lotacao} type="text" label="Lotação" maxW={["100%", "48%"]} error={ errors.lotacao } {...register('lotacao')} />
            <Input defaultValue={van?.marca} type="text" label="Marca" maxW={["100%", "48%"]} error={ errors.marca } {...register('marca')} />

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