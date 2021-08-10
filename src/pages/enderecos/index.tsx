import { Box, Divider, useBreakpointValue } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { FlexContainer } from "../../components/FlexContainer"

export default function Endereco() {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const headersWideVersion = ["Logradouro", "Número", "Bairro"]
  const bodyContentWideVersion = [
    {data: ["Rua Luiz Razera", "700", "Nova América"]},
    {data: ["Rua Professora Carolina Mendes Thames", "1200", "Recanto Universitário"]}
  ]
  const bodyContentMobileVersion = [
    {
      title: "Logradouro",
      content: "Rua Luiz Razera"
    },
    {
      title: "Número",
      content: "700",
    },
    {
      title: "Bairro",
      content: "Nova América"
    },
  ]

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Endereços" createLink="/enderecos/adicionar">
        {isWideVersion ? (
          <TableWideVersion 
            showProfile={false}
            headers={headersWideVersion} 
            bodyData={bodyContentWideVersion}
            editLink="/enderecos/editar"
            deleteLink="/enderecos/excluir"
            />         
          ) : (
            <TableMobileVersion
              showProfile={false}
              data={bodyContentMobileVersion}
              editLink="/enderecos/editar"
              deleteLink="/enderecos/excluir"
            />
        )}  
      </FlexContainer> 
    </Box>
  )
}