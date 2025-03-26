"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Goal, Eye, Loader2 } from "lucide-react"
import { useMainStore } from "@/stores/mainStore"

interface MissionVisionSectionProps {
  contentId?: string // ID opcional para permitir personalización
}

export function MissionVisionSection({ contentId = "cnt_56545cbf-b5b0" }: MissionVisionSectionProps) {
  const { fetchContent } = useMainStore()
  const [content, setContent] = useState<{
    mission: string
    vision: string
    quote: string
  }>({
    mission: "",
    vision: "",
    quote: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true)
        // Obtener el contenido con ID específico usando la función del store
        const contentData = await fetchContent(contentId)

        // Extraer los textos del HTML usando un enfoque simple
        const htmlBody = contentData.body || ""

        // Crear un elemento DOM temporal para analizar el HTML
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = htmlBody

        // Extraer los textos
        const missionText = extractTextAfterHeading(tempDiv, "Misión")
        const visionText = extractTextAfterHeading(tempDiv, "Visión")
        const quoteText = extractTextAfterHeading(tempDiv, "Cita")

        setContent({
          mission: missionText,
          vision: visionText,
          quote: quoteText,
        })

        setError(null)
      } catch (err) {
        console.error("Error al cargar el contenido:", err)
        setError("No se pudo cargar el contenido. Por favor, intenta de nuevo más tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    loadContent()
  }, [fetchContent, contentId])

  // Función auxiliar para extraer texto después de un encabezado específico
  const extractTextAfterHeading = (element: HTMLElement, headingText: string): string => {
    const headings = element.querySelectorAll("h2")

    for (let i = 0; i < headings.length; i++) {
      if (headings[i].textContent === headingText) {
        // Si encontramos el encabezado, buscamos el párrafo siguiente
        const nextElement = headings[i].nextElementSibling
        if (nextElement && nextElement.tagName === "P") {
          return nextElement.textContent || ""
        }
      }
    }

    return ""
  }

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-16 flex justify-center items-center min-h-[300px]">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-white pb-0 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-blue-50 rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <Goal className="w-10 h-10 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Misión</h3>
            <p className="text-gray-600 mb-6">{content.mission}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-green-50 rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Eye className="w-10 h-10 text-green-700" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Visión</h3>
            <p className="text-gray-600 mb-6">{content.vision}</p>
          </motion.div>
        </div>

        {content.quote && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8 text-center"
          >
            <div className="pt-16 border-gray-200">
              <p className="text-xl font-semibold text-blue-700 italic">{content.quote}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

