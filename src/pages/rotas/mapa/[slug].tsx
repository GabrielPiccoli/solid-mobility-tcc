import { Flex, Box, Divider, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useQuery } from "react-query";
import { FlexContainer } from "../../../components/FlexContainer";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import ReactMapboxGl, { ZoomControl, Marker} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from "react";

type MapaRotaProps = {
  params: {
    slug: string;
  }
}

type Location = {
  isLoading: boolean;
  coords: {
    lat: number
    long: number
  }
}

export default function MapaRota({ params }: MapaRotaProps) {
  const id = params?.slug
  const { data, isLoading } = useQuery(['mapa-rota', id], async () => {
    const response = await api.get(`/paradas/rota/${id}`)
    const data = response.data
    let coords = ""
    data.map((parada: any) => (
      coords += parada.endereco.coordinates + ";"
    ))
    coords = coords.substring(0, coords.length - 1).replace(/ /g, "")

    // const teste = await api.get(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coords}?access_token=pk.eyJ1IjoiZ2FicmllbHBpY2NvbGkiLCJhIjoiY2t1Mzh2d2cyMXJ0YTJ0b3F3eGwydjR6cyJ9.T8aeobVwmyRGCzAIluQWOw`)

    // console.log(teste)

    return data
  })

  const ReactMap = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZ2FicmllbHBpY2NvbGkiLCJhIjoiY2t1Mzh2d2cyMXJ0YTJ0b3F3eGwydjR6cyJ9.T8aeobVwmyRGCzAIluQWOw",
  })

  const [location, setLocation] = useState<Location>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLocation({
        isLoading: false,
        coords: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
      })
    }, function(error) {
      console.log(error)
    })
  }, [])

  return (
    <Box> 
      <Header />
      <Divider />
      {!location ? (
        <Spinner />
      ) : (
        <ReactMap
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: 'calc(100vh - 85px)',
            width: '100%',
            position: 'relative',
            display: 'block',
          }}
          center={[location.coords.long, location.coords.lat]}
          zoom={[14]}
          
        >
          <ZoomControl position={'bottom-right'} />
        </ReactMap>            
        )}
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