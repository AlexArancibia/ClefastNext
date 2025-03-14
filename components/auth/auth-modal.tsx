"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"

type AuthView = "login" | "register"

interface AuthModalProps {
  trigger?: React.ReactNode
  defaultView?: AuthView
  onClose?: () => void
}

export function AuthModal({ trigger, defaultView = "login", onClose }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<AuthView>(defaultView)
  const { isAuthenticated, checkAuth } = useAuthStore()

  // Verify authentication when component mounts
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleSuccess = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open && onClose) onClose()
  }

  // If user is already authenticated, don't show the modal
  if (isAuthenticated) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger || <Button>Iniciar sesión</Button>}</DialogTrigger>
      <DialogContent className="w-5/6 sm:w-[450px] rounded-xl z-[500] x-4 sm:px-6">
        <DialogTitle className="sr-only">{view === "login" ? "Iniciar sesión" : "Registrarse"}</DialogTitle>
        {view === "login" ? (
          <LoginForm onSuccess={handleSuccess} onRegisterClick={() => setView("register")} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} onLoginClick={() => setView("login")} />
        )}
      </DialogContent>
    </Dialog>
  )
}

