export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}
export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}
