import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    },
    blue: {
      "900": "#002633",
      "800": "#005673",
      "700": "#00607F",
      "600": "#007399",
      "500": "#0085B2",
      "400": "#008FBF",
      "300": "#399EBF",
      "200": "#00BFFF",
      "100": "#0AC9C7",
      "50": "#4DD2FF",
    }
  },
  fonts: {
    heading: 'MuseoModerno',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.300',
        color: 'gray.900'
      }
    }
  }
})