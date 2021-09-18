import { api } from "../apiClient"

type Endereco = {
  id: string
  logradouro: string
  numero: number
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  cep: string
} 

export async function updateEndereco({ id, logradouro, numero, complemento, bairro, cidade, estado, cep }: Endereco) {
  try {
    const response = await api.put('/enderecos', { 
      id,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep
     })
    const endereco = response.data

    return endereco
  } catch (err) {
    console.log(err)
  }
}