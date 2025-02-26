"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingCart, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
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
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container-section py-3">
        <div className="content-section">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/clefastlogo.png"
                alt="Clefast Logo"
                width={140}
                height={40}
                className="h-8 w-auto md:h-10"
                priority
              />
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#4CAF50]",
                    pathname === item.href ? "text-[#4CAF50] font-semibold" : "text-gray-600",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search and Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Bar - Desktop */}
              <div className="hidden md:block relative w-64 xl:w-72">
                <Input
                  type="search"
                  placeholder="Buscar Productos"
                  className="pl-10 w-full bg-gray-50 focus-visible:ring-[#4CAF50]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* Search Toggle - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <Search className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Cart and User Icons */}
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-[#4CAF50] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-gray-600" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col space-y-4 mt-6">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "text-base font-medium transition-colors hover:text-[#4CAF50] py-2",
                            pathname === item.href ? "text-[#4CAF50] font-semibold" : "text-gray-600",
                          )}
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                    <div className="pt-4">
                      <Button className="w-full bg-[#4CAF50] hover:bg-[#3d8b40]">Iniciar Sesión</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search - Expandable */}
          {isSearchVisible && (
            <div className="md:hidden mt-3">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Buscar Productos"
                  className="pl-10 w-full bg-gray-50 focus-visible:ring-[#4CAF50]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

