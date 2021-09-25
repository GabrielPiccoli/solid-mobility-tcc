import { api } from "../apiClient"

type Parada = {
  rota_id: string
  endereco_id: string
  ponto_partida?: boolean
  ponto_final?: boolean
} 

export async function createParada({ rota_id, endereco_id, ponto_partida, ponto_final }: Parada) {
  try {
    const response = await api.post('/paradas', { 
      rota_id,
      endereco_id,
      ponto_partida,
      ponto_final
     })
    const parada = response.data

    return parada
  } catch (err) {
    console.log(err)
  }
}