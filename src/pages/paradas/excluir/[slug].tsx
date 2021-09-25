import { Flex, Box, Divider, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useQuery } from "react-query";
import { FlexContainer } from "../../../components/FlexContainer";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";

type ExcluirParadaProps = {
  params: {
    slug: string;
  }
}

export default function ExcluirParada({ params }: ExcluirParadaProps) {
  const id = params?.slug
  const { isLoading } = useQuery(['del-parada', id], async () => {
    await api.delete(`/paradas/${id}`).then(() => { router.push('/paradas') })
  })

  return (
    <>
      <Box> 
        <Header />
        <Divider />
        <FlexContainer title="Paradas">
          <Flex justify="center">
            {isLoading ? (
              <>
                <Spinner /> &nbsp;Excluindo Parada
              </>
            ) : (
              <>
                Erro inesperado, por gentileza, tente novamente
              </>
            )}
          </Flex>
        </FlexContainer> 
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {
      params: ctx.params
    }
  }
})