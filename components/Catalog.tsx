"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useMainStore } from "@/stores/mainStore"

interface CatalogoItem {
  id: string
  title: string
  imageUrl: string
  pdfUrl: string
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

export function Catalogo() {
  const { contents, fetchContents } = useMainStore()
  const [catalogoItems, setCatalogoItems] = useState<CatalogoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContents()
  }, [fetchContents])

  useEffect(() => {
    if (!contents.length) return
    
    async function fetchCatalogo() {
      try {
        const catalogoData = contents.find((c) => c.slug === "catalogo")
        if (!catalogoData) return

        const parser = new DOMParser()
        const doc = parser.parseFromString(catalogoData.body!, "text/html")
        const items: CatalogoItem[] = []

        doc.querySelectorAll("h3").forEach((titleElement, index) => {
          const linkElement = titleElement.nextElementSibling?.querySelector("a")
          const imgElement = titleElement.nextElementSibling?.nextElementSibling?.querySelector("img")
          
          if (linkElement && imgElement) {
            items.push({
              id: `item-${index}`,
              title: titleElement.textContent || "Sin título",
              pdfUrl: linkElement.href,
              imageUrl: imgElement.src,
            })
          }
        })

        setCatalogoItems(items)
      } catch (error) {
        console.error("Error al obtener el catálogo", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCatalogo()
  }, [contents])

  return (
    <div>
      {/* Sección del título con fondo */}
      <div className="  py-20 bg-[url('/fondoproduct.jpg')] bg-cover bg-center">
 
        <motion.div className="relative text-center" {...fadeIn}>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Nuestro Catálogo
          </h2>
        </motion.div>
      </div>

      {/* Sección de contenido */}
      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <p className="text-center text-lg font-medium text-gray-600">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {catalogoItems.map((item) => (
              <motion.div 
                key={item.id} 
                className="group relative rounded-xl overflow-hidden shadow-lg bg-white"
                whileHover={{ scale: 1.02 }} 
                transition={{ duration: 0.3 }}
              >
                {/* Imagen con overlay */}
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Efecto de oscurecimiento al pasar el cursor */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Contenido emergente */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-white font-semibold text-xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <Button asChild className="bg-white text-black hover:bg-gray-200 transition">
                    <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Ver Catálogo
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
