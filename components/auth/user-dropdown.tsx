"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/stores/authStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, LogOut, Settings, ShoppingBag } from "lucide-react"
import Link from "next/link"

export function UserDropdown() {
  const { userInfo, logout, isAuthenticated, checkAuth } = useAuthStore()

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (!isAuthenticated || !userInfo) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-secondary ">
          {userInfo.firstName && userInfo.lastName && (<div className="flex h-full w-full items-center justify-center rounded-full bg-accents text-primary-foreground">
            {userInfo.firstName.charAt(0)}
            {userInfo.lastName.charAt(0)}
          </div>)}
          
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[300] mt-4" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userInfo.firstName} {userInfo.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{userInfo.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer flex w-full items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Mi perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders" className="cursor-pointer flex w-full items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Mis pedidos</span>
          </Link>
        </DropdownMenuItem>
 
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

