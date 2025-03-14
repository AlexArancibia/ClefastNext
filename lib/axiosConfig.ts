import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios"

// Ensure environment variables are properly typed
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ENDPOINT: string
      NEXT_PUBLIC_API_KEY: string
    }
  }
}

// Determinar la baseURL: usar la variable de entorno
const baseURL = process.env.NEXT_PUBLIC_ENDPOINT

// Crear la instancia de Axios con la baseURL definida
const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para incluir el token de autenticación o API key
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log("Request interceptor called with config:", config)

    // Primero intentar obtener el token JWT del localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("auth-storage") : null
    let jwtToken = null

    // Si hay un token en localStorage, extraer el accessToken
    if (token) {
      try {
        const authState = JSON.parse(token)
        jwtToken = authState.state?.accessToken || null
        console.log("JWT token retrieved from auth storage")
      } catch (e) {
        console.error("Error parsing auth storage:", e)
      }
    }

    // Usar el JWT token si existe, de lo contrario usar la API key
    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`
      console.log("Authorization header set with JWT token")
    } else if (process.env.NEXT_PUBLIC_API_KEY) {
      config.headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      console.log("Authorization header set with API key", process.env.NEXT_PUBLIC_API_KEY)
    }

    // Si la URL no es absoluta, agregar la baseURL correcta
    if (config.url && !config.url.startsWith("http")) {
      console.log("URL before correction:", config.url)
      config.url = `${baseURL}${config.url}`
      console.log("URL after correction:", config.url)
    }

    return config
  },
  (error: any) => {
    console.error("Request interceptor error:", error)
    return Promise.reject(error)
  },
)

// Interceptor de respuestas para manejar errores globales
apiClient.interceptors.response.use(
  (response) => {
    console.log("Response received:", response)
    return response
  },
  (error) => {
    console.error("API request failed:", error)
    if (error.response) {
      console.error("Error response data:", error.response.data)
      console.error("Error response status:", error.response.status)
      console.error("Error response headers:", error.response.headers)
    } else if (error.request) {
      console.error("No response received. Request details:", error.request)
    } else {
      console.error("Unexpected error during API request:", error.message)
    }
    return Promise.reject(error)
  },
)

export default apiClient

