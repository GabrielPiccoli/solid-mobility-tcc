import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";

type AddVanFormData = {
  placa: string
  anoFabricacao: number
  lotacao: number
  marca: string
}

const AddVanSchema = yup.object().shape({
  placa: yup.string().required('Placa obrigatória'),
  anoFabricacao: yup.number().required('Ano de Fabricação obrigatório'),
  lotacao: yup.number().required('Lotação obrigatória'),
  marca: yup.string().required('Marca obrigatória')
}) 

export default function AdicionarVan() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddVanSchema)
  })

  const { errors } = formState
  const handleAddVan: SubmitHandler<AddVanFormData> = (values) => {
    console.log(values)
  }

  return (
    <Box>
      <Header />
      <Divider />
      <FlexContainer title="Adicionar Van" onSubmit={handleSubmit(handleAddVan)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          <Input type="text" label="Placa" maxW={["100%", "48%"]} error={ errors.placa } {...register('placa')} />
          <Input type="text" label="Ano de Fabricação" maxW={["100%", "48%"]} error={ errors.anoFabricacao } {...register('anoFabricacao')} />
          <Input type="text" label="Lotação" maxW={["100%", "48%"]} error={ errors.lotacao } {...register('lotacao')} />
          <Input type="text" label="Marca" maxW={["100%", "48%"]} error={ errors.marca } {...register('marca')} />

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