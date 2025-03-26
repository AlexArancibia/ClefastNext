"use client"

import { useState, useEffect } from "react"
import { useMainStore } from "@/stores/mainStore"
import { HeroCarouselBase } from "./HeroCaruselBase"

export function HeroSection() {
  const { heroSections, fetchHeroSections } = useMainStore()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch de las secciones de héroe
  useEffect(() => {
    const loadHeroSections = async () => {
      try {
        console.log("Cargando hero sections...")
        setIsLoading(true)
        await fetchHeroSections()
        setError(null)
      } catch (err) {
        console.error("Error al cargar las secciones de héroe:", err)
        setError("No se pudieron cargar las secciones de héroe. Por favor, intenta de nuevo más tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    loadHeroSections()
  }, [fetchHeroSections])

  // Filtrar solo las secciones con metadata.section igual a "inicio"
  const filteredSections = Array.isArray(heroSections)
    ? heroSections.filter((section) => {
        return (
          section.metadata &&
          typeof section.metadata === "object" &&
          "section" in section.metadata &&
          section.metadata.section === "inicio" &&
          section.isActive
        )
      })
    : []

  // Si no hay secciones filtradas, no mostrar nada
  if (filteredSections.length === 0 && !isLoading) {
    console.log("No hay secciones de héroe para mostrar")
    return null
  }

  // Si está cargando, mostrar un skeleton
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    )
  }

  // Si hay un error, mostrar un mensaje
  if (error) {
    console.error("Error en hero sections:", error)
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden">
      <HeroCarouselBase heroSections={filteredSections} autoplayInterval={10000} containerHeight="calc(100vh - 60px)" />
    </div>
  )
}

