import { Box, Divider, useBreakpointValue } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { FlexContainer } from "../../components/FlexContainer"

export default function Motorista() {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const headersWideVersion = ["Motorista"]
  const bodyContentWideVersion = [
    {data: []},
    {data: []}
  ]
  const bodyContentMobileVersion = [
    { title: '', content: ''},
  ]

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Motoristas" createLink="/mostoristas/adicionar">
        {isWideVersion ? (
          <TableWideVersion 
            headers={headersWideVersion} 
            bodyData={bodyContentWideVersion}
            editLink="/passageiros/editar"
            deleteLink="/passageiros/excluir"
          />         
        ) : (
          <TableMobileVersion
            data={bodyContentMobileVersion}
            editLink="/passageiros/editar"
            deleteLink="/passageiros/excluir"
          />
        )}
      </FlexContainer>
    </Box>
  )
}