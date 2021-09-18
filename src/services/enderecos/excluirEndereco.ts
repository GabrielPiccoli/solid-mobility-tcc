import router from "next/router"
import { api } from "../apiClient"

export async function deleteEndereco(id: string) {
  try {
    const response = await api.delete(`/enderecos/${id}`)
    const results = response.data
    
    router.push('/enderecos')
    return results
  } catch (err) {
    console.log(err)
  }
}