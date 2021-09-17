import { Box, Button, Divider, Flex } from "@chakra-ui/react";
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

type AddRouteFormData = {
  nome: string
  destino: number
  qtdePassageiros: number
  horario: string
}

const AddRouteSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  destino: yup.number().required('Destino obrigatório'),
  qtdePassageiros: yup.number().required('Quantidade de Passageiros obrigatório'),
  horario: yup.string().required('Horário obrigatório'),
  // passageiros: yup.string().required('Passageiros obrigatório')
}) 

export default function AdicionarRota() {
  const [passengers, setPassengers] = useState<string[]>([])
  const [qtdePassengers, setQtdePassengers] = useState(1)
  const [passengersInputs, setPassengersInputs] = useState<string[]>(['passageiro1'])

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddRouteSchema)
  })

  const { errors } = formState
  const handleAddAddress: SubmitHandler<AddRouteFormData> = (values) => {
    console.log(values)
  }

  function handleAddPassengerInput() {
    let newQtde = qtdePassengers + 1
    setQtdePassengers(newQtde)
    const newPassenger = `passageiro${newQtde}`
    setPassengersInputs([
      ...passengersInputs,
      newPassenger
    ])
  }

  function handleAddPassenger(event: ChangeEvent<HTMLSelectElement>) {
    setPassengers([
      ...passengers,
      event.target.value
    ])
  }

  return (
    <Box>
      <Header />
      <Divider />
      <FlexContainer title="Adicionar Rota" onSubmit={handleSubmit(handleAddAddress)}>
        <Flex as="form" wrap="wrap" justify="space-between" sx={{ gap: "1em 0"}}>
          <Input type="text" label="Nome" maxW={["100%", "48%"]} error={ errors.nome } {...register('nome')} />
          <Select label="Destino" maxW={["100%", "48%"]} error={ errors.destino } {...register('destino')}>
            <option value="1">Rua Luiz Razera</option>
            <option value="2">Rua Professora Carolina Mendes Thame</option>
          </Select>
          <Input type="text" label="Quantidade de Passageiros" maxW={["100%", "48%"]} error={ errors.qtdePassageiros } {...register('qtdePassageiros')} />
          <Input type="text" label="Horário" maxW={["100%", "48%"]} error={ errors.horario } {...register('horario')} />
          {passengersInputs.map((item) => (
            <Select label="Passageiro" key={item} maxW={["100%", "48%"]} {...register(`${item}`)}>
              <option value="0">Selecione um Passageiro</option>
              <option value="3">Gabriel Piccoli de Marcos</option>
              <option value="4">Leticia Pinheiro Lazarin</option>
            </Select>
          ))}
          
          {/* <Input type="text" value={passengers} error={ errors.passageiros } {...register('passageiros')} /> */}
          <Box w="100%">
            <Button type="button" colorScheme="teal" size="lg" onClick={handleAddPassengerInput}>Adicionar Passageiro</Button>
            <Button type="submit" ml="4" colorScheme="blue" size="lg" isLoading={formState.isSubmitting} >Salvar</Button>
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