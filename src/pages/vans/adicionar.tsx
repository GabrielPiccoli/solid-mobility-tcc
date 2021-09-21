import { Box, Button, Divider, Flex, Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useState } from "react";
import { createVan } from "../../services/vans/adicionarVan";

type AddVanFormData = {
  placa: string
  lotacao: number
  marca: string
}

const AddVanSchema = yup.object().shape({
  placa: yup.string().required('Placa obrigatória'),
  lotacao: yup.number().required('Lotação obrigatória'),
  marca: yup.string().required('Marca obrigatória')
}) 

export default function AdicionarVan() {
  const [alerta, setAlerta] = useState(false)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddVanSchema)
  })

  const { errors } = formState
  const handleAddVan: SubmitHandler<AddVanFormData> = async (values, e) => {
    const vanAdicionada = await createVan(values)

    if (!!vanAdicionada) {
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
      <FlexContainer title="Adicionar Van" onSubmit={handleSubmit(handleAddVan)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          {alerta && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle mr={2} color="green.500">Van cadastrada com sucesso!</AlertTitle>
              <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
            </Alert>
          )}
          <Input type="text" label="Placa" maxW={["100%", "48%"]} error={ errors.placa } {...register('placa')} />
          <Input type="text" label="Lotação" maxW={["100%", "48%"]} error={ errors.lotacao } {...register('lotacao')} />
          <Input type="text" label="Marca" maxW={["100%", "48%"]} error={ errors.marca } {...register('marca')} />

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