import { Box, Button, Divider, Flex, Alert, AlertIcon, AlertTitle, CloseButton, Spinner } from "@chakra-ui/react";
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
import { updateEndereco } from "../../../services/enderecos/editarEndereco";

type UpdateAddressFormData = {
  logradouro: string
  numero: number
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

interface Endereco extends UpdateAddressFormData {
  id: string
  motorista_id: string
}

type EditarEnderecoProps = {
  params: {
    slug: string;
  }
}

const UpdateAddressSchema = yup.object().shape({
  logradouro: yup.string().required('Logradouro obrigatório'),
  numero: yup.number().required('Número obrigatório'),
  complemento: yup.string(),
  bairro: yup.string().required('Bairro obrigatório'),
  cidade: yup.string().required('Cidade obrigatória'),
  estado: yup.string().required('Estado obrigatório'),
  cep: yup.string().required('Cep obrigatório')
}) 

export default function EditarEndereco({params}: EditarEnderecoProps) {
  const [alerta, setAlerta] = useState(false)
  const [endereco, setEndereco] = useState<Endereco>()
  const id = params?.slug
  
  const { data, isLoading, error } = useQuery(['endereco', id], async () => {
    const response = await api.get(`/endereco/${id}`)
    const data = response.data
    setEndereco(data)

    return data
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UpdateAddressSchema)
  })

  const { errors } = formState
  const handleEditAddress: SubmitHandler<UpdateAddressFormData> = async (values, e) => {
    const enderecoAtualizado = await updateEndereco({
      id,
      ...values
    })

    if (!!enderecoAtualizado) {
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
      <FlexContainer title="Editar Endereço" onSubmit={handleSubmit(handleEditAddress)}>
        { isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
            {alerta && (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle mr={2} color="green.500">Endereço atualizado com sucesso!</AlertTitle>
                <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <Input type="text" defaultValue={endereco?.cep} label="Cep" maxW={["100%", "48%"]} error={ errors.cep } {...register('cep')} />
            <Input type="text" defaultValue={endereco?.logradouro} label="Logradouro" maxW={["100%", "48%"]} error={ errors.logradouro } {...register('logradouro')} />
            <Input type="text" defaultValue={endereco?.numero} label="Número" maxW={["100%", "48%"]} error={ errors.numero } {...register('numero')} />
            <Input type="text" defaultValue={endereco?.complemento} label="Complemento" maxW={["100%", "48%"]} error={ errors.complemento } {...register('complemento')} />
            <Input type="text" defaultValue={endereco?.bairro} label="Bairro" maxW={["100%", "48%"]} error={ errors.bairro } {...register('bairro')} />
            <Input type="text" defaultValue={endereco?.cidade} label="Cidade" maxW={["100%", "48%"]} error={ errors.cidade } {...register('cidade')} />
            <Input type="text" defaultValue={endereco?.estado} label="Estado" maxW={["100%", "48%"]} error={ errors.estado } {...register('estado')} />

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