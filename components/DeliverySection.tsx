"use client"

import { useMainStore } from "@/stores/mainStore"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function DeliveryHeroSection() {
  const { heroSections } = useMainStore()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isClient, setIsClient] = useState(false)

  // Asegurarnos de que estamos en el cliente antes de renderizar animaciones
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Encontrar la primera sección de delivery
  const deliverySection = heroSections?.find((section) => section.isActive && section.metadata?.section === "delivery")

  // Si no hay sección de delivery, no mostrar nada
  if (!deliverySection) return null

  // Extraer datos básicos
  const {
    title,
    subtitle,
    backgroundImage,
    mobileBackgroundImage,
    buttonText,
    buttonLink,
    styles = {},
  } = deliverySection

  // Usar imagen de fondo para móvil si está disponible
  const bgImage = isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage

  // Altura fija según especificaciones
  const height = isMobile ? "500px" : "300px"

  // Obtener clases de Tailwind directamente de los estilos
  const textAlignClass = styles.textAlign || "text-left"
  const verticalAlignClass = styles.verticalAlign || "items-center"
  const titleColorClass = styles.titleColor || "text-gray-900"
  const subtitleColorClass = styles.subtitleColor || "text-gray-600"

  return (
    <section className="overflow-hidden">
      <div className="container-section py-4 lg:py-8 mb-8">
        <div
          className={`content-section rounded-3xl overflow-hidden flex ${verticalAlignClass} relative`}
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: height,
          }}
        >
          {/* Contenido principal */}
          <div
            className={`container mx-auto px-4 md:px-6 flex ${textAlignClass === "text-center" ? "justify-center" : textAlignClass === "text-right" ? "justify-end" : "justify-start"} relative z-10`}
          >
            <div className={`max-w-xl p-8 ${textAlignClass}`}>
              {title && (
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${titleColorClass}`}>{title}</h2>
              )}

              {subtitle && <p className={`text-sm md:text-base lg:text-lg mb-6 ${subtitleColorClass}`}>{subtitle}</p>}

              {buttonText && buttonLink && (
                <div
                  className={
                    textAlignClass === "text-center"
                      ? "flex justify-center"
                      : textAlignClass === "text-right"
                        ? "flex justify-end"
                        : ""
                  }
                >
                  <Button className="mt-4" asChild>
                    <Link href={buttonLink}>{buttonText}</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Imagen del carro con animación - solo renderizar en el cliente */}
          {isClient && (
            <>
              {/* Versión desktop */}
              <motion.div
                className="absolute right-0 bottom-0 z-20 hidden md:block"
                animate={{ x: [500, 0], opacity: [0, 1] }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: 0.2,
                }}
              >
                <Image
                  src="/delivery.png"
                  alt="Delivery"
                  width={300}
                  height={200}
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Versión móvil */}
              {isMobile && (
                <motion.div
                  className="absolute right-0 bottom-0 z-20 block md:hidden"
                  animate={{ x: [200, 0], opacity: [0, 1] }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                >
                  <Image
                    src="/delivery.png"
                    alt="Delivery"
                    width={150}
                    height={100}
                    className="object-contain"
                    priority
                  />
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

