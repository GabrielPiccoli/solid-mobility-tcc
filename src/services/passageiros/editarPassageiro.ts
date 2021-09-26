import { api } from "../apiClient"

type Passageiro = {
  id: string
  nome: string
  email: string
  cpf: string
  parada_id: string
} 

export async function updatePassageiro({ id, nome, email, cpf, parada_id }: Passageiro) {
  try {
    const response = await api.put('/passageiros', { 
      id,
      nome, 
      email,
      cpf, 
      parada_id 
    })
    const passageiro = response.data
    
    return passageiro
  } catch (err) {
    console.log(err)
  }
}