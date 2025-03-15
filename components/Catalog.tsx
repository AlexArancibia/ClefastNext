"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface CatalogoItem {
  id: string
  title: string
  description: string
  imageUrl: string
  pdfUrl: string
}

const catalogoItems: CatalogoItem[] = [
  {
    id: "industrial",
    title: "Línea Estándar Clásica",
    description: "Soluciones de lavado para la industria textil, hospitales y grandes instalaciones.",
    imageUrl: "/catalogo1.png",
    pdfUrl: "https://drive.google.com/file/d/17wtytfSRHh6rtQeWJ6S9vtXOLciuET7q/view?usp=drive_link",
  },
  {
    id: "hotelero",
    title: "Línea Premium",
    description: "Productos especializados para hoteles, hostales y establecimientos turísticos.",
    imageUrl: "/catalogo2.png",
    pdfUrl: "https://drive.google.com/file/d/1TObL458vY-jvRX3y5Tean7rxYWRqsSnf/view?usp=drive_link",
  },
  {
    id: "domestico",
    title: "Línea Especializada",
    description: "Soluciones de alto rendimiento para lavanderías comerciales y uso doméstico.",
    imageUrl: "/catalogo3.png",
    pdfUrl: "https://drive.google.com/file/d/1jeESB5HhnpdxK4bAIV3p-tEMHO8HZIsn/view?usp=drive_link",
  },
];
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
}


export function Catalogo() {
  const [previewItem, setPreviewItem] = useState<CatalogoItem | null>(null)

  const handleDownload = (item: CatalogoItem) => {
    // Crear un enlace temporal y simular un clic para descargar
    const link = document.createElement("a")
    link.href = item.pdfUrl
    link.download = `${item.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePreview = (item: CatalogoItem) => {
    setPreviewItem(item)
  }

  const closePreview = () => {
    setPreviewItem(null)
  }

  return (
      <div className="">
        <div className="container-section py-16 md:py-16 bg-[url('/fondoproduct.jpg')] bg-cover">
        <motion.div className="content-section text-center" {...fadeIn}>
          <h2 className="text-white mb-2">Nuestro Catálogo</h2>
 
        </motion.div>
      </div>
    <div className=" content-section">
      

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {catalogoItems.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="group">
              <div className="relative w-full aspect-[1/1.414] overflow-hidden rounded-lg shadow-md">
                {/* Imagen principal */}
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay en hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-white">
                  <h3 className="font-bold text-xl mb-6">{item.title}</h3>

                  <div className="flex flex-col gap-3 w-full max-w-[200px]">
                    <Button
                      variant="outline"
                      className="w-full bg-white/10 hover:bg-white/20 border-white/30"
                      onClick={() => handlePreview(item)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Vista previa
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleDownload(item)}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar PDF
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Diálogo de vista previa */}
      <Dialog open={!!previewItem} onOpenChange={closePreview}>
        <DialogContent className="  z-[466]">
          {previewItem && (
            <>
              <DialogTitle>{previewItem.title}</DialogTitle>
              <DialogDescription>{previewItem.description}</DialogDescription>

              <div className="mt-4 aspect-[3/4]   relative rounded-lg overflow-hidden">
                <Image
                  src={previewItem.imageUrl || "/placeholder.svg"}
                  alt={previewItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={closePreview}>
                  Cerrar
                </Button>
                <Button onClick={() => handleDownload(previewItem)}>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

