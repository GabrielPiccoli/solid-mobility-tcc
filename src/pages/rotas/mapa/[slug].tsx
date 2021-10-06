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

  // const dataWithCoords = data.map(async (parada: any) => {
  //   const endereco = `${parada?.endereco.logradouro}, ${parada?.endereco.numero}`
  //   let coord: any
  //   const coordResponse = await api.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${endereco}.json?access_token=pk.eyJ1IjoiZ2FicmllbHBpY2NvbGkiLCJhIjoiY2t1Mzh2d2cyMXJ0YTJ0b3F3eGwydjR6cyJ9.T8aeobVwmyRGCzAIluQWOw&autocomplete=true`)
  //   .then(response => {
  //     return {
  //       ...parada,
  //       coord: `${response.data.features[0].center[0]}, ${response.data.features[0].center[1]}`
  //     }
  //   })
  // })

  // console.log(dataWithCoords)

  return (
    <Box> 
      <Header />
      <Divider />
      <FlexContainer title="Mapa Rota" createLink="/rotas/adicionar">
         <Box>
           {isLoading ? (
             <Spinner />
           ) : (
            //  data.map((parada: any) => (
              //  ))
              //   
              <Box>teste</Box>
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