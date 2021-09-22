import { Box, Button, Divider, Flex, Alert, AlertIcon, AlertTitle, CloseButton, Spinner } from "@chakra-ui/react";
import { FlexContainer } from "../../components/FlexContainer";
import { Header } from "../../components/Header";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../services/apiClient";
import { updateMotorista } from "../../services/motoristas/editarMotorista";
import { AuthContext } from "../../contexts/AuthContext";

type UpdateDriverFormData = {
  nome: string
  email: string
  cnh: string
  senha: string
}

interface Motorista extends UpdateDriverFormData {
  id: string
}

const UpdateDriverSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  cnh: yup.string().required('CNH obrigatória'),
  senha: yup.string().required('Senha obrigatória')
}) 

export default function EditarMotorista() {
  const { setUser, user } = useContext(AuthContext) 
  const [alerta, setAlerta] = useState(false)
  const [motorista, setMotorista] = useState<Motorista>()
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UpdateDriverSchema)
  })

  const { data, isLoading, error } = useQuery(['motorista-update'], async () => {
    const response = await api.get(`/me`)
    const data = response.data
    setMotorista(data)
    
    return data
  })
  
  
  const { errors } = formState
  const handleUpdateDriver: SubmitHandler<UpdateDriverFormData> = async (values) => {
    const motoristaAtualizado = await updateMotorista(values)
    
    if (!!motoristaAtualizado) {
      setAlerta(true)
      setUser({
        nome: motoristaAtualizado.nome ,
        email: motoristaAtualizado.email,
        cnh: motoristaAtualizado.cnh
      })
    }
  }

  function closeAlert() {
    setAlerta(false)
  }

  return (
    <Box>
      <Header />
      <Divider />
      <FlexContainer title="Editar Perfil" onSubmit={handleSubmit(handleUpdateDriver)}>
        { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : (
            <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
              {alerta && (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle mr={2} color="green.500">Perfil atualizado com sucesso!</AlertTitle>
                  <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
                </Alert>
              )}
              <Input
                defaultValue={motorista?.nome}
                type="text"
                label="Nome"
                maxW={["100%","48%"]}
                error={ errors.nome }
                {...register('nome')} 
              />
              <Input
                defaultValue={motorista?.email}
                type="email"
                label="E-mail"
                maxW={["100%", "48%"]}
                error={ errors.email }
                {...register('email')} 
              />
              <Input
                defaultValue={motorista?.cnh}
                type="text"
                label="CNH"
                maxW={["100%", "48%"]}
                error={ errors.cnh }
                {...register('cnh')}
              />
              <Input
                type="password"
                label="Senha"
                maxW={["100%", "48%"]}
                error={ errors.senha }
                {...register('senha')} 
              />

              <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Salvar</Button>
            </Flex>
          )}        
      </FlexContainer>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})