import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsappButton"
import { Toaster } from "@/components/ui/sonner"

 
export const metadata: Metadata = {
  title: "Clefast - Tu Tienda en Línea",
  description: "Encuentra los mejores productos en Clefast",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      
      <body className={`antialiased`}>
      <Navbar />
        
        {children}
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
      
    </html>
  )
}

