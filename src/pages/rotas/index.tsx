import { Box, Divider, useBreakpointValue } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { FlexContainer } from "../../components/FlexContainer"

export default function Rota() {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const headersWideVersion = ["Nome", "Destino", "Passageiros", "Horário"]
  const bodyContentWideVersion = [
    {data: ["Capivari", "IFSP - Capivari", "15", "Noturno"]},
    {data: ["Piracicaba", "Colégio Lorem Ipsum", "12", "Matutino"]}
  ]
  const bodyContentMobileVersion = [
    {
      title: "Nome",
      content: "Capivari"
    },
    {
      title: "Destino",
      content: "IFSP - Capivari",
    },
    {
      title: "Passageiros",
      content: "15"
    },
    {
      title: "Horário",
      content: "Noturno"
    },
  ]

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Rotas" createLink="/rotas/adicionar">
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