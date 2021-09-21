import { api } from "../apiClient"

type Van = {
  placa: string
  lotacao: number
  marca: string
} 

export async function createVan({ placa, lotacao, marca }: Van) {
  try {
    const response = await api.post('/vans', { 
      placa,
      lotacao,
      marca
     })
    const van = response.data

    return van
  } catch (err) {
    console.log(err)
  }
}