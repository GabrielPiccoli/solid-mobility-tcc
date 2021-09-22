import { api } from "../apiClient"

type Motorista = {
  nome: string
  email: string
  cnh: string
  senha: string
} 

export async function createMotorista({ nome, email, cnh, senha }: Motorista) {
  try {
    const response = await api.post('/motoristas', { 
      nome, 
      email,
      cnh, 
      senha
     })
    const motorista = response.data

    return motorista
  } catch (err) {
    console.log(err)
  }
}