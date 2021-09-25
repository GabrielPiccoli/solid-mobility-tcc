import { Flex, Box, Divider, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useQuery } from "react-query";
import { FlexContainer } from "../../../components/FlexContainer";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";

type ExcluirRotaProps = {
  params: {
    slug: string;
  }
}

export default function ExcluirRota({ params }: ExcluirRotaProps) {
  const id = params?.slug
  const { isLoading } = useQuery(['del-rota', id], async () => {
    await api.delete(`/rotas/${id}`).then(() => { router.push('/rotas') })
  })

  return (
    <>
      <Box> 
        <Header />
        <Divider />
        <FlexContainer title="Rotas">
          <Flex justify="center">
            {isLoading ? (
              <>
                <Spinner /> &nbsp;Excluindo Rota
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