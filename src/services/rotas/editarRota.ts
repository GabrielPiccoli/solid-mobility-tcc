import { api } from "../apiClient"

type Rota = {
  id: string
  descricao: string
  van_id: string
} 

export async function updateRota({ id, descricao, van_id }: Rota) {
  try {
    const response = await api.put('/rotas', { 
      id,
      descricao, 
      van_id 
    })
    const rota = response.data
    
    return rota
  } catch (err) {
    console.log(err)
  }
}