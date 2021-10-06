import { api } from "../apiClient"

type Endereco = {
  logradouro: string
  numero: number
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  coordinates: string
} 

export async function createEndereco({ logradouro, numero, complemento, bairro, cidade, estado, cep, coordinates }: Endereco) {
  try {
    const response = await api.post('/enderecos', { 
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
      coordinates
     })
    const endereco = response.data

    return endereco
  } catch (err) {
    console.log(err)
  }
}