import { Box, Divider, useBreakpointValue } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { FlexContainer } from "../../components/FlexContainer"
import { GetServerSideProps } from "next"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { useQuery } from "react-query"
import { api } from "../../services/apiClient"
import { useState } from "react"

export default function Passageiro() {
  type Passageiro = {
    id: string
    nome: string
    email: string
    cpf: string
    parada_id: string
  }

  type Endereco = {
    id: string
    logradouro: string
    numero: number
  }
  
  type Parada = {
    id: string
    endereco_id: string
    endereco: Endereco
  }

  type BodyContent = {
    data: string[],
    id: string
  }

  const [passageiros, setPassageiros] = useState<Passageiro[]>()
  const [paradas, setParadas] = useState<Parada[]>()
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const { data, isLoading, error } = useQuery('passageiros', async () => {
    const passageirosResponse = await api.get('/passageiros')
    const passageirosData = passageirosResponse.data
    setPassageiros(passageirosData)
    
    const paradasResponse = await api.get('/paradas')
    const paradasData = paradasResponse.data

    const enderecosResponse = await api.get('/enderecos')
    const enderecosData = enderecosResponse.data

    const newParadas = paradasData.map((parada: Parada) => ({
      ...parada,
      endereco: enderecosData.find((endereco: Endereco) => endereco.id === parada.endereco_id)
    }))

    setParadas(newParadas)
    
    return {
      paradas: newParadas,
      passageiros: passageirosData
    }
  })

  const bodyContent:BodyContent[] = []  
  passageiros?.map(passageiro => {
    let parada = paradas?.find(parada => parada.id === passageiro.parada_id)
    let endereco = parada?.endereco
    bodyContent.push({
      data: [passageiro.nome, `${endereco?.logradouro}, ${endereco?.numero}`],
      id: passageiro.id
    })
  })
  const headers = ["Passageiro", "Parada"]  


  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Passageiros" createLink="/passageiros/adicionar">
        {isWideVersion ? (
          <TableWideVersion 
            showProfile={false}
            headers={headers} 
            bodyData={bodyContent}
            editLink="/passageiros/editar"
            deleteLink="/passageiros/excluir"
          />         
        ) : (
          <>
            {bodyContent.map(dados => (
              <TableMobileVersion
                key={dados.id}
                showProfile={false}
                headers={headers}
                data={dados.data}
                editLink={`/passageiros/editar/${dados.id}`}
                deleteLink={`/passageiros/excluir/${dados.id}`}
              />
            ))}
          </>
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