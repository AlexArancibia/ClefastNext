"use client"

import apiClient from "@/lib/axiosConfig"
import type { CreateCustomerDto, Customer, UpdateCustomerDto } from "@/types/customer"
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Tipos para la autenticación
export interface AuthResponse {
  access_token: string
  userInfo: Customer
}

export interface LoginCredentials {
  email: string
  password: string
}

// Duración de la caché en milisegundos (5 minutos)
const CACHE_DURATION = 5 * 60 * 1000

interface AuthState {
  isAuthenticated: boolean
  userInfo: Customer | null
  accessToken: string | null
  isLoading: boolean
  error: string | null
  lastFetch: {
    userInfo: number | null
  }

  // Acciones
  login: (credentials: LoginCredentials) => Promise<void>
  register: (userData: CreateCustomerDto) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<boolean>
  clearError: () => void
  fetchUserInfo: () => Promise<Customer | null>
  updateCustomer: (customerId: string, userData: UpdateCustomerDto) => Promise<Customer | null>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userInfo: null,
      accessToken: null,
      isLoading: false,
      error: null,
      lastFetch: {
        userInfo: null,
      },

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await apiClient.post<AuthResponse>("/customers/login", credentials)
          set({
            isAuthenticated: true,
            userInfo: response.data.userInfo,
            accessToken: response.data.access_token,
            isLoading: false,
            lastFetch: { userInfo: Date.now() },
          })
          console.log("Login exitoso:", response.data.userInfo.firstName)
        } catch (error: any) {
          set({
            isAuthenticated: false,
            userInfo: null,
            accessToken: null,
            isLoading: false,
            error: error.response?.data?.message || error.message || "Error desconocido al iniciar sesión",
          })
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          // Registrar al usuario
          const response = await apiClient.post<Customer>("/customers", userData)

          // Después del registro, iniciar sesión automáticamente
          if (userData.email && userData.password) {
            await get().login({
              email: userData.email,
              password: userData.password,
            })
          } else {
            set({
              isLoading: false,
              error: "Email or password is missing for automatic login",
            })
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || error.message || "Error desconocido al registrarse",
          })
        }
      },

      updateCustomer: async (customerId, userData: UpdateCustomerDto) => {
        const { accessToken } = get()
        if (!accessToken) return null

        set({ isLoading: true, error: null })
        try {
          const response = await apiClient.patch<Customer>(`/customers/${customerId}`, userData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          set({
            userInfo: response.data,
            isLoading: false,
            lastFetch: { userInfo: Date.now() },
          })

          return response.data
        } catch (error: any) {
          console.error("Error al actualizar información del usuario:", error)
          set({
            isLoading: false,
            error: error.response?.data?.message || error.message || "Error al actualizar información del usuario",
          })
          return null
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          userInfo: null,
          accessToken: null,
          error: null,
          lastFetch: { userInfo: null },
        })
      },

      checkAuth: async () => {
        const { accessToken, userInfo, lastFetch } = get()
        const now = Date.now()

        // Verificar que exista un token y que userInfo tenga un ID válido
        if (!accessToken || !userInfo || !userInfo.id) {
          set({ isAuthenticated: false })
          return false
        }

        // Si la información del usuario está en caché y es reciente, se utiliza
        if (lastFetch.userInfo && now - lastFetch.userInfo < CACHE_DURATION) {
          set({ isAuthenticated: true })
          return true
        }

        // Actualizar la información del usuario
        const fetchedUser = await get().fetchUserInfo()
        if (fetchedUser) {
          set({ isAuthenticated: true })
          return true
        } else {
          set({
            isAuthenticated: false,
            userInfo: null,
            accessToken: null,
            lastFetch: { userInfo: null },
          })
          return false
        }
      },

      fetchUserInfo: async () => {
        const { accessToken, userInfo } = get()
        // Utilizar el ID real del usuario en lugar de la ruta "me"
        if (!accessToken || !userInfo || !userInfo.id) return null

        set({ isLoading: true })
        try {
          const response = await apiClient.get<Customer>(`/customers/${userInfo.id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          set({
            userInfo: response.data,
            isLoading: false,
            lastFetch: { userInfo: Date.now() },
          })

          return response.data
        } catch (error: any) {
          console.error("Error al obtener información del usuario:", error)
          set({
            isLoading: false,
            error: error.response?.data?.message || error.message || "Error al obtener información del usuario",
          })
          return null
        }
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userInfo: state.userInfo,
        accessToken: state.accessToken,
        lastFetch: state.lastFetch,
      }),
    },
  ),
)
