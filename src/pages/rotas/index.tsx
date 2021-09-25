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

export default function Rota() {
  type Rota = {
    id: string
    descricao: string
    van_id: string
    van_placa: string
  }

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

  const [rotas, setRotas] = useState<Rota[]>()
  const [vans, setVans] = useState<Van[]>()
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const { data, isLoading, error } = useQuery('rotas', async () => {
    const rotasResponse = await api.get('/rotas')
    const vansResponse = await api.get('/vans')
    const data = rotasResponse.data

    setVans(vansResponse.data)
    
    const newRotas = data.map((rota: Rota) => {
      let vanPlaca = vans?.find(van => van.id === rota.van_id)

      return {
        ...rota,
        van_placa: vanPlaca?.placa,
      }
    })
    setRotas(newRotas)

    return data
  })

  const bodyContent:BodyContent[] = []  
  rotas?.map(rota => {
    bodyContent.push({
      data: [rota.descricao, rota.van_placa],
      id: rota.id
    })
  })
  const headers = ["Descricao", "Van"]  

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Rotas" createLink="/rotas/adicionar">
        {isWideVersion ? (
          <TableWideVersion 
            showProfile={false}
            headers={headers} 
            bodyData={bodyContent}
            editLink="/rotas/editar"
            deleteLink="/rotas/excluir"
            />         
          ) : (
            <>
              {bodyContent.map(dados => (
                <TableMobileVersion
                  key={dados.id}
                  showProfile={false}
                  headers={headers}
                  data={dados.data}
                  editLink={`/rotas/editar/${dados.id}`}
                  deleteLink={`/rotas/excluir/${dados.id}`}
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