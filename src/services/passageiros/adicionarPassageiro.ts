import { api } from "../apiClient"

type Passageiro = {
  nome: string
  email: string
  cpf: string
  parada_id: string
} 

export async function createPassageiro({ nome, email, cpf, parada_id}: Passageiro) {
  try {
    const response = await api.post('/passageiros', { 
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