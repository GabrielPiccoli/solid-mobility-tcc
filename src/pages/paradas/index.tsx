import { Box, Divider, useBreakpointValue, Flex, Spinner } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { FlexContainer } from "../../components/FlexContainer"
import { GetServerSideProps } from "next"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { useQuery } from "react-query"
import { api } from "../../services/apiClient"
import { useState } from "react"

export default function Parada() {
  
  type Endereco = {
    id: string
    logradouro: string
    numero: number
  }
  
  type Rota = {
    id: string
    descricao: string
  }
  
  type Parada = {
    id: string
    endereco_id: string
    rota_id: string
    ponto_partida: boolean
    ponto_final: boolean
    endereco: string
    rota: string
  }

  type BodyContent = {
    data: string[],
    id: string
  }

  const [paradas, setParadas] = useState<Parada[]>()
  const [rotas, setRotas] = useState<Rota[]>()
  const [enderecos, setEnderecos] = useState<Endereco[]>()

  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const { data, isLoading, error } = useQuery('paradas', async () => {
    const paradasResponse = await api.get('/paradas')
    const rotasResponse = await api.get('/rotas')
    const enderecosResponse = await api.get('/enderecos')
    const data = paradasResponse.data

    setRotas(rotasResponse.data)
    setEnderecos(enderecosResponse.data)
    
    const newParadas = data.map((parada: Parada) => {
      let rotaParada = rotas?.find(rota => rota.id === parada.rota_id)
      let enderecoParada = enderecos?.find(endereco => endereco.id === parada.endereco_id)

      return {
        ...parada,
        endereco: `${enderecoParada?.logradouro}, ${enderecoParada?.numero}`,
        rota: rotaParada?.descricao
      }
    })
    setParadas(newParadas)

    return data
  })

  const bodyContent:BodyContent[] = []  
  paradas?.map((parada: Parada) => {
    let tipo = parada.ponto_final ? 'Chegada' : parada.ponto_partida ? 'Partida' : 'Caminho'
    bodyContent.push({
      data: [parada.rota, tipo, parada.endereco],
      id: parada.id
    })
  })
  const headers = ["Rota", "Tipo", "Endereço"]

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Paradas" createLink="/paradas/adicionar">
        { isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ): error ? (
          <Flex justify="center">
            Erro ao buscar dados do servidor.
          </Flex>
        ) : isWideVersion ? (
            <TableWideVersion 
              showProfile={false}
              headers={headers} 
              bodyData={bodyContent}
              editLink="/paradas/editar"
              deleteLink="/paradas/excluir"
              />         
            ) : (
              <>
                {bodyContent.map(dados => (
                  <TableMobileVersion
                    key={dados.id}
                    showProfile={false}
                    headers={headers}
                    data={dados.data}
                    editLink={`/paradas/editar/${dados.id}`}
                    deleteLink={`/paradas/excluir/${dados.id}`}
                  />
                ))}
              </>
            ) 
        }
      </FlexContainer> 
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})