import { Flex, Box, Divider, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useQuery } from "react-query";
import { FlexContainer } from "../../../components/FlexContainer";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";

type MapaRotaProps = {
  params: {
    slug: string;
  }
}

export default function MapaRota({ params }: MapaRotaProps) {
  const id = params?.slug
  const { data, isLoading } = useQuery(['mapa-rota', id], async () => {
    const response = await api.get(`/paradas/rota/${id}`)
    const data = response.data

    return data
  })

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Mapa Rota" createLink="/rotas/adicionar">
         <Box>
           {isLoading ? (
             <Spinner />
           ) : (
             data.map((parada: any) => (
              <Box>{parada.endereco.logradouro}</Box>
             ))
           )}
         </Box>
      </FlexContainer> 
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {
      params: ctx.params
    }
  }
})