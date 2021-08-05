import { Box, Divider, useBreakpointValue } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { FlexContainer } from "../../components/FlexContainer"

export default function Van() {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const headersWideVersion = ["Placa", "Ano", "Marca"]
  const bodyContentWideVersion = [
    {data: ["FJG0380", "2015", "Renault"]},
    {data: ["DFR2687", "2018", "Pegeout"]}
  ]
  const bodyContentMobileVersion = [
    {
      title: "Placa",
      content: "FJG0380"
    },
    {
      title: "Ano",
      content: "2015",
    },
    {
      title: "Marca",
      content: "Renault"
    },
  ]

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Vans" createLink="/vans/adicionar">
        {isWideVersion ? (
          <TableWideVersion 
            showProfile={false}
            headers={headersWideVersion} 
            bodyData={bodyContentWideVersion}
            editLink="/vans/editar"
            deleteLink="/vans/excluir"
            />         
          ) : (
            <TableMobileVersion
              showProfile={false}
              data={bodyContentMobileVersion}
              editLink="/vans/editar"
              deleteLink="/vans/excluir"
            />
        )}
      </FlexContainer>
    </Box>
  )
}