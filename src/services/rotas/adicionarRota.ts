import { api } from "../apiClient"

type Rota = {
  descricao: string
  van_id: string
} 

export async function createRota({ descricao, van_id }: Rota) {
  try {
    const response = await api.post('/rotas', { 
      descricao,
      van_id
     })
    const rota = response.data

    return rota
  } catch (err) {
    console.log(err)
  }
}