"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Menu, ShoppingCart, User, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useCartStore } from "@/stores/cartStore"
import { useMainStore } from "@/stores/mainStore"
import { useAuthStore } from "@/stores/authStore"
import { UserDropdown } from "@/components/auth/user-dropdown"
import { AuthModal } from "@/components/auth/auth-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Productos", href: "/productos" },
  { name: "Promociones", href: "/promociones" },
  { name: "Catálogo", href: "/catalogo" },
  { name: "Blog", href: "/blog" },
  { name: "Contáctenos", href: "/contactenos" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, removeItem } = useCartStore()
  const { shopSettings } = useMainStore()
  const defaultCurrency = shopSettings[0]?.defaultCurrency
  const { isAuthenticated, checkAuth } = useAuthStore()

  const [authChecking, setAuthChecking] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      await checkAuth()
      setAuthChecking(false)
    }

    // Check if we have a token in localStorage first
    const hasToken = typeof window !== "undefined" && localStorage.getItem("auth-storage") !== null

    checkAuthStatus()
  }, [checkAuth])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => {
    const price = item.variant.prices.find((p) => p.currencyId === defaultCurrency?.id)?.price || 0
    return sum + price * item.quantity
  }, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Crear un nuevo objeto URLSearchParams
      const params = new URLSearchParams()

      // Añadir el término de búsqueda
      params.set("search", searchTerm.trim())

      // Si estamos en la página de productos, conservar otros parámetros importantes
      if (pathname === "/productos") {
        // Conservar parámetros como sort, page, etc., pero no search (ya lo estamos estableciendo)
        searchParams.forEach((value, key) => {
          if (key !== "search" && key !== "page") {
            params.set(key, value)
          }
        })

        // Resetear a página 1 cuando se hace una nueva búsqueda
        params.delete("page")
      }

      // Construir la URL
      const url = `/productos?${params.toString()}`

      // Si ya estamos en la página de productos, usar replace para forzar una actualización
      if (pathname === "/productos") {
        router.replace(url)
      } else {
        router.push(url)
      }

      // Cerrar el diálogo
      setIsSearchOpen(false)

      // Limpiar el término de búsqueda después de buscar
      setSearchTerm("")
    }
  }

  return (
    <nav className="bg-background/100 backdrop-blur-md border-b sticky top-0 z-[180]">
      <div className="container-section py-3">
        <div className="content-section">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="w-1/4 lg:w-1/4">
              <Link href="/" aria-label="Ir a la página de inicio">
                <Image
                  src="/clefastlogo.png"
                  alt="Clefast Logo"
                  width={140}
                  height={40}
                  className="h-8 w-auto md:h-10"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-1/2 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 xl:px-5 py-2 text-sm font-normal transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary font-semibold" : "text-secondary",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search and Icons */}
            <div className="flex items-center justify-end w-3/4 lg:w-1/3 xl:w-1/4 gap-4">
              {/* Search Icon and Dialog */}
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-secondary hover:text-primary hover:bg-secondary/10"
                    aria-label="Buscar productos"
                  >
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[400px] sm:max-w-md   z-[555] bg-background/95 backdrop-blur-md border-none shadow-lg">
                  <DialogTitle className="text-xl font-semibold text-center">Buscar productos</DialogTitle>
                  <form onSubmit={handleSearch} className="flex flex-col gap-4 mt-2">
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="¿Qué estás buscando?"
                        className="flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                      />
                      <Button type="submit">Buscar</Button>
                    </div>
                    {searchTerm.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Presiona Enter para buscar &quot;{searchTerm}&quot;
                      </p>
                    )}
                  </form>
                </DialogContent>
              </Dialog>

              {/* Cart Icon and Drawer */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-secondary hover:text-primary hover:bg-secondary/10"
                    aria-label="Carrito de compras"
                  >
                    <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[350px] sm:w-[400px] bg-background">
                  <SheetHeader>
                    <SheetTitle>Tu Carrito</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-[97%]">
                    <div className="flex-grow overflow-y-auto">
                      {items.length === 0 ? (
                        <p className="text-center text-muted-foreground">Tu carrito está vacío</p>
                      ) : (
                        items.map((item) => (
                          <div key={item.variant.id} className="flex items-center gap-4 py-2 border-b">
                            <Image
                              src={item.product.imageUrls[0] || "/placeholder.svg"}
                              alt={item.product.title}
                              width={50}
                              height={50}
                              className="object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-base">{item.product.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                Cantidad: {item.quantity} x {defaultCurrency?.symbol}
                                {Number(
                                  item.variant.prices.find((p) => p.currencyId === defaultCurrency?.id)?.price,
                                ).toFixed(2)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.variant.id)}
                              aria-label="Eliminar producto"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                    {items.length > 0 && (
                      <div className="mt-auto pt-4 border-t">
                        <p className="font-semibold text-lg mb-4">
                          Total: {defaultCurrency?.symbol}
                          {totalPrice.toFixed(2)}
                        </p>
                        <div className="flex gap-2">
                          <SheetClose asChild>
                            <Button asChild className="flex-1" variant="outline">
                              <Link href="/cart">Ver Carrito</Link>
                            </Button>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button asChild className="flex-1">
                              <Link href="/checkout">Proceder a Pagar</Link>
                            </Button>
                          </SheetClose>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* User Icon - Desktop */}
              {authChecking ? (
                <Skeleton className="h-9 w-32 rounded-md" /> // Skeleton for loading state
              ) : isAuthenticated ? (
                <UserDropdown />
              ) : (
                <AuthModal
                  trigger={
                    <Button
                      variant="ghost"
                      className="hidden sm:flex bg-primary text-white hover:text-primary font-normal text-[13px] hover:bg-secondary/10 px-3"
                      aria-label="Iniciar sesión"
                    >
                      <User className="h-5 w-5 mr-2" aria-hidden="true" />
                      Iniciar Sesión
                    </Button>
                  }
                />
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-secondary hover:text-primary hover:bg-secondary/10"
                    aria-label="Abrir menú"
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background">
                  <SheetHeader>
                    <SheetTitle>Menú de navegación</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-4 mt-6">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "text-base font-medium transition-colors hover:text-primary py-2",
                            pathname === item.href ? "text-primary font-semibold" : "text-secondary",
                          )}
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

