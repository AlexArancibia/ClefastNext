"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuthStore } from "@/stores/authStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Validation schema for login form
const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: () => void
  onRegisterClick?: () => void
}

export function LoginForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const { login, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      // Error is already handled in the store
      console.error("Error in login form:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>
        <p className="text-gray-500 dark:text-gray-400">Ingresa tus credenciales para acceder a tu cuenta</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" placeholder="tu@email.com" {...register("email")} onChange={() => clearError()} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            onChange={() => clearError()}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" {...register("rememberMe")} />
          <Label htmlFor="rememberMe" className="text-sm font-normal">
            Recordarme
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ¿No tienes una cuenta?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={onRegisterClick}>
            Regístrate
          </Button>
        </p>
      </div>
    </div>
  )
}

