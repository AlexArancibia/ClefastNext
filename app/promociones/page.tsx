"use client"

import { useEffect, useState } from "react"
import { useMainStore } from "@/stores/mainStore"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { HeroCarouselBase } from "@/components/HeroCaruselBase"

export default function PromocionesPage() {
  const { heroSections, fetchHeroSections } = useMainStore()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadHeroSections = async () => {
      try {
        console.log("PromocionesPage - Loading hero sections...")
        setIsLoading(true)
        await fetchHeroSections()
        setError(null)
      } catch (err) {
        console.error("PromocionesPage - Error al cargar las promociones:", err)
        setError("No se pudieron cargar las promociones. Por favor, intenta de nuevo más tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    loadHeroSections()
  }, [fetchHeroSections])

  // Filtrar solo las secciones con metadata.section = "promociones" y que estén activas
  const filteredSections = Array.isArray(heroSections)
    ? heroSections.filter((section) => {
        return (
          section.isActive &&
          section.metadata &&
          typeof section.metadata === "object" &&
          "section" in section.metadata &&
          section.metadata.section === "promociones"
        )
      })
    : []

  console.log("PromocionesPage - Filtered sections:", filteredSections.length)
  console.log("PromocionesPage - First section:", filteredSections[0]?.id)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-7xl mx-auto py-10 px-4">
        <Card>
          <CardContent className="flex justify-center items-center min-h-[300px]">
            <p className="text-center text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (filteredSections.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto py-10 px-4">
        <Card>
          <CardContent className="flex justify-center items-center min-h-[300px]">
            <p className="text-center text-muted-foreground">No hay promociones disponibles en este momento.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden flex justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="w-full">
        <HeroCarouselBase heroSections={filteredSections} />
      </motion.div>
    </div>
  )
}

