import actions from './../states/ducks/auth/actions';
import axios from "axios"
import { store } from "../states/store"

const instance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use(
  config => {
    try {
      const token = store.getState().auth.user.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    } catch (error) {
      console.log(error)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 401:
          console.log("Unauthorized - Redirect to login page")
          store.dispatch(actions.logout())
          window.location.href = '/login';
          break
        case 403:
          console.log("Forbidden - Handle accordingly")
          break
        case 404:
          console.log("Not Found - Handle accordingly")
          break
        default:
          console.error("Unhandled error:", error.response)
      }
    } else if (error.request) {
      console.error("No response received:", error.request)
    } else {
      console.error("Request setup error:", error.message)
    }

    return Promise.reject(error)
  }
)

export default instance
