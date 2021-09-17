import { Box, Divider, useBreakpointValue } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { TableWideVersion } from "../../components/Table/TableWideVersion"
import { TableMobileVersion } from "../../components/Table/TableMobileVersion"
import { FlexContainer } from "../../components/FlexContainer"
import { GetServerSideProps } from "next"
import { withSSRAuth } from "../../utils/withSSRAuth"

export default function Passageiro() {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  const headersWideVersion = ["Aluno", "Ponto", "Destino", "Van"]
  const bodyContentWideVersion = [
    {data: ["Rua Luiz Rasera, 700 - Bloco 7 Apto 301", "IFSP - Capivari", "FJG0380"]},
    {data: ["Rua Fernando de Noronha, 165", "IFSP - Capivari", "FJG0380"]}
  ]
  const bodyContentMobileVersion = [
    {
      title: "Ponto",
      content: "Rua Luiz Rasera, 700 - Bloco 7 Apto 301"
    },
    {
      title: "Destino",
      content: "IFSP - Capivari",
    },
    {
      title: "Van",
      content: "FJG0380"
    },
  ]

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Passageiros" createLink="/passageiros/adicionar">
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

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})