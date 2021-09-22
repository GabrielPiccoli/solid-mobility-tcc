import Router from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { createContext, ReactNode } from "react"
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "../services/apiClient"

type User = {
  nome: string
  email: string
  cnh: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  user: User
  isAuthenticated: boolean
  setUser: Dispatch<SetStateAction<User>>
}

type AuthProviderProps = {
  children: ReactNode
}


export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, 'solidmobility.token')
  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as User)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'solidmobility.token': token } = parseCookies()

    if (token) {
      api.get('/me')
        .then(response => {
          const { nome, email, cnh } = response.data
          setUser({
            nome,
            email,
            cnh
          })
        })
        .catch(error => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/login', { email, senha: password })
      const token = response.data

      setCookie(undefined, 'solidmobility.token', token, {
        maxAge: 60 * 60 * 24,
        path: '/'
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      
      Router.push('/vans')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, setUser }}>
      { children }
    </AuthContext.Provider>
  )
}