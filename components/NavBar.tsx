"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingCart, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Productos", href: "/productos" },
  { name: "Blog", href: "/blog" },
  { name: "Contactenos", href: "/contactenos" },
  { name: "Promociones", href: "/promociones" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isSearchVisible, setIsSearchVisible] = React.useState(false)

  return (
    <nav className="bg-background border-b sticky top-0 z-[190]">
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
            <div className="flex items-center justify-end w-3/4 lg:w-1/3 xl:w-1/4 gap-2">
              {/* Search Bar - Desktop */}
              <div className="hidden lg:block relative w-full max-w-[200px] xl:max-w-[220px]">
                <Input
                  type="search"
                  placeholder="Buscar Productos"
                  className="pl-10 w-full bg-gray-100 border-border focus-visible:ring-primary"
                  aria-label="Buscar productos"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary"
                  aria-hidden="true"
                />
              </div>

              {/* Search Toggle - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-secondary hover:text-primary hover:bg-secondary/10"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </Button>

              {/* Cart Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-secondary hover:text-primary hover:bg-secondary/10"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User Icon - Desktop */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-secondary hover:text-primary hover:bg-secondary/10"
                aria-label="Perfil de usuario"
              >
                <User className="h-5 w-5" aria-hidden="true" />
              </Button>

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
                    <div className="pt-4">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Iniciar Sesión
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search - Expandable */}
          {isSearchVisible && (
            <div className="lg:hidden mt-3">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Buscar Productos"
                  className="pl-10 w-full bg-gray-100 border-border focus-visible:ring-primary"
                  aria-label="Buscar productos"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

