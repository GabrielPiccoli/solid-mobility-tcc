import { Box, Divider, useBreakpointValue, Flex, Spinner } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { FlexContainer } from "../../components/FlexContainer"
import { GetServerSideProps } from "next"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { useQuery } from "react-query"
import { api } from "../../services/apiClient"

export default function Endereco() {
  type Endereco = {
    id: string
    logradouro: string
    numero: number
    complemento?: string
    bairro: string
    cidade: string
    estado: string
    cep: string
    motorista_id: string
  } 

  type BodyContent = {
    data: string[],
    id: string
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const { data, isLoading, error } = useQuery('enderecos', async () => {
    const response = await api.get('/enderecos')
    const data = response.data

    return data
  })

  const bodyContent:BodyContent[] = []  
  data?.map((endereco: Endereco) => {
    bodyContent.push({
      data: [endereco.logradouro, endereco.numero.toString(), endereco.bairro],
      id: endereco.id
    })
  })
  const headers = ["Logradouro", "Número", "Bairro"]

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Endereços" createLink="/enderecos/adicionar">
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
              editLink="/enderecos/editar"
              deleteLink="/enderecos/excluir"
              />         
            ) : (
              <>
                {bodyContent.map(dados => (
                  <TableMobileVersion
                    key={dados.id}
                    showProfile={false}
                    headers={headers}
                    data={dados.data}
                    editLink={`/enderecos/editar/${dados.id}`}
                    deleteLink={`/enderecos/excluir/${dados.id}`}
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