import { api } from "../apiClient"

type Van = {
  id: string
  placa: string
  lotacao: number
  marca: string
} 

export async function updateVan({ id, placa, lotacao, marca }: Van) {
  try {
    const response = await api.put('/vans', { 
      id,
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