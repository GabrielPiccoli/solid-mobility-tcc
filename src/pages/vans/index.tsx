import { Box, Divider, useBreakpointValue } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { FlexContainer } from "../../components/FlexContainer"
import { GetServerSideProps } from "next"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { useQuery } from "react-query"
import { api } from "../../services/apiClient"

export default function Van() {
  type Van = {
    id: string
    placa: string
    lotacao: number
    marca: string
  } 

  type BodyContent = {
    data: string[],
    id: string
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const { data, isLoading, error } = useQuery('vans', async () => {
    const response = await api.get('/vans')
    const data = response.data

    return data
  })

  const bodyContent:BodyContent[] = []  
  data?.map((van: Van) => {
    bodyContent.push({
      data: [van.placa, van.lotacao.toString(), van.marca],
      id: van.id
    })
  })
  const headers = ["Placa", "Lotação", "Marca"]
  

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Vans" createLink="/vans/adicionar">
        {isWideVersion ? (
          <TableWideVersion 
            showProfile={false}
            headers={headers} 
            bodyData={bodyContent}
            editLink="/vans/editar"
            deleteLink="/vans/excluir"
            />         
          ) : (
            <>
              {bodyContent.map(dados => (
                <TableMobileVersion
                  key={dados.id}
                  showProfile={false}
                  headers={headers}
                  data={dados.data}
                  editLink={`/vans/editar/${dados.id}`}
                  deleteLink={`/vans/excluir/${dados.id}`}
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