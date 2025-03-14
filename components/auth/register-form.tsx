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

// Validation schema for registration form
const registerSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  phone: z.string().min(6, "El teléfono debe tener al menos 6 caracteres"),
  acceptsMarketing: z.boolean().optional(),
  termsAccepted: z.literal(false, {
    errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
  }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
  onLoginClick?: () => void
}

export function RegisterForm({ onSuccess, onLoginClick }: RegisterFormProps) {
  const { register: registerUser, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      acceptsMarketing: false,
      termsAccepted: false,
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { termsAccepted, ...userData } = data

      await registerUser({
        ...userData,
        acceptsMarketing: userData.acceptsMarketing || false,
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      // Error is already handled in the store
      console.error("Error in registration form:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <p className="text-gray-500 dark:text-gray-400">Completa el formulario para registrarte</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input id="firstName" placeholder="Juan" {...register("firstName")} onChange={() => clearError()} />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input id="lastName" placeholder="Pérez" {...register("lastName")} onChange={() => clearError()} />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" placeholder="tu@email.com" {...register("email")} onChange={() => clearError()} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" placeholder="912345678" {...register("phone")} onChange={() => clearError()} />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
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

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="acceptsMarketing" {...register("acceptsMarketing")} />
            <Label htmlFor="acceptsMarketing" className="text-sm font-normal">
              Deseo recibir ofertas y novedades por correo
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="termsAccepted" {...register("termsAccepted")} />
            <Label htmlFor="termsAccepted" className="text-sm font-normal">
              Acepto los{" "}
              <a href="/terms" className="text-primary hover:underline">
                términos y condiciones
              </a>
            </Label>
          </div>
          {errors.termsAccepted && <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registrando...
            </>
          ) : (
            "Registrarse"
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={onLoginClick}>
            Inicia sesión
          </Button>
        </p>
      </div>
    </div>
  )
}

