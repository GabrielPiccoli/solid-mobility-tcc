import { api } from "../apiClient"

type Parada = {
  id: string
  rota_id: string
  endereco_id: string
  ponto_partida?: boolean
  ponto_final?: boolean
} 

export async function updateParada({ id, rota_id, endereco_id, ponto_partida=false, ponto_final=false}: Parada) {
  try {
    const response = await api.put('/paradas', { 
      id,
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