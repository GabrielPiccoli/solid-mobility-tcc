import { Flex, Box, Divider, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useQuery } from "react-query";
import { FlexContainer } from "../../../components/FlexContainer";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";

type ExcluirEnderecoProps = {
  params: {
    slug: string;
  }
}

export default function ExcluirEndereco({ params }: ExcluirEnderecoProps) {
  const id = params?.slug
  const { isLoading } = useQuery(['del-endereco', id], async () => {
    await api.delete(`/enderecos/${id}`).then(() => { router.push('/enderecos') })
  })

  return (
    <>
      <Box> 
        <Header />
        <Divider />
        <FlexContainer title="Endereços">
          <Flex justify="center">
            {isLoading ? (
              <>
                <Spinner /> &nbsp;Excluindo Endereço
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