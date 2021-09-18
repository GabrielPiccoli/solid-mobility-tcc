import { api } from "../apiClient"

type Endereco = {
  logradouro: string
  numero: number
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  cep: string
} 

export async function createEndereco({ logradouro, numero, complemento, bairro, cidade, estado, cep }: Endereco) {
  try {
    const response = await api.post('/enderecos', { 
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