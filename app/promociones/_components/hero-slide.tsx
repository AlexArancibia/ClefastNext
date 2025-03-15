"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { HeroSection } from "@/types/heroSection"

interface HeroSlideProps {
  heroSection: HeroSection
}

export function HeroSlide({ heroSection }: HeroSlideProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Detectar el tamaño de pantalla para aplicar los estilos correspondientes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Extraer estilos
  const styles = heroSection.styles || {}

  // Determinar qué imagen de fondo usar
  const backgroundImage =
    isMobile && heroSection.mobileBackgroundImage ? heroSection.mobileBackgroundImage : heroSection.backgroundImage

  // Determinar altura según el dispositivo y restar 40px
  const getAdjustedHeight = (heightClass: string) => {
    // Si es min-h-screen, usar calc(100vh - 40px)
    if (heightClass === "min-h-screen") {
      return "h-[calc(100vh-40px)]"
    }

    // Para otras clases, intentar extraer el valor y restar 40px
    const match = heightClass.match(/h-\[(\d+)px\]/)
    if (match && match[1]) {
      const originalHeight = Number.parseInt(match[1])
      const adjustedHeight = Math.max(originalHeight - 40, 0) // Asegurar que no sea negativo
      return `h-[${adjustedHeight}px]`
    }

    // Si no se puede ajustar, devolver la clase original
    return heightClass
  }

  const height = getAdjustedHeight(
    isMobile
      ? styles.height?.mobile || "min-h-screen"
      : isTablet
        ? styles.height?.tablet || "min-h-screen"
        : styles.height?.desktop || "min-h-screen",
  )

  // Determinar ancho del contenido según el dispositivo
  const contentWidth = isMobile
    ? styles.contentWidth?.mobile || "max-w-full"
    : isTablet
      ? styles.contentWidth?.tablet || "max-w-2xl"
      : styles.contentWidth?.desktop || "max-w-3xl"

  // Determinar padding del contenido según el dispositivo
  const contentPadding = isMobile
    ? styles.contentPadding?.mobile || "py-8 px-4"
    : isTablet
      ? styles.contentPadding?.tablet || "py-12 px-6"
      : styles.contentPadding?.desktop || "py-16 px-8"

  // Determinar tamaño del título según el dispositivo
  const titleSize = isMobile
    ? styles.titleSize?.mobile || "text-[1.5em]"
    : isTablet
      ? styles.titleSize?.tablet || "text-[2em]"
      : styles.titleSize?.desktop || "text-[2.5em]"

  // Determinar tamaño del subtítulo según el dispositivo
  const subtitleSize = isMobile
    ? styles.subtitleSize?.mobile || "text-[0.875em]"
    : isTablet
      ? styles.subtitleSize?.tablet || "text-[1em]"
      : styles.subtitleSize?.desktop || "text-[1.125em]"

  // Configurar alineación vertical
  const verticalAlign = styles.verticalAlign || "items-center"

  // Configurar alineación horizontal
  const textAlign = styles.textAlign || "text-left"

  // Variantes de animación para el contenido
  const contentVariants = {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          staggerChildren: 0.2,
        },
      },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          staggerChildren: 0.2,
        },
      },
    },
    slideIn: {
      hidden: { opacity: 0, x: textAlign === "text-left" ? -50 : textAlign === "text-right" ? 50 : 0 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          staggerChildren: 0.2,
        },
      },
    },
    none: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    },
  }

  // Seleccionar la animación basada en el estilo
  const animation = styles.animation || "none"
  const selectedAnimation = contentVariants[animation as keyof typeof contentVariants] || contentVariants.none

  // Determinar la variante del botón
  const buttonVariant = styles.buttonVariant || "default"
  const buttonSize = styles.buttonSize || "default"

  // Determinar colores
  const titleColor = styles.titleColor || "text-gray-900"
  const subtitleColor = styles.subtitleColor || "text-gray-600"
  const overlayColor = styles.overlayColor || "bg-white/0"
  const textShadow = styles.textShadow || "none"

  // Determinar propiedades de fondo
  const backgroundSize = styles.backgroundSize || "bg-cover"
  const backgroundPosition = styles.backgroundPosition || "bg-center"

  return (
    <div
      className={cn("relative flex w-full", height, verticalAlign)}
      style={{ willChange: "transform" }} // Optimización de rendimiento
    >
      {/* Imagen de fondo */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt={heroSection.title || "Hero image"}
            fill
            priority
            className={cn("object-cover", backgroundSize, backgroundPosition)}
            sizes="100vw"
            quality={95} // Aumentada la calidad
            loading="eager" // Carga inmediata para mejor experiencia
            style={{ willChange: "transform" }} // Optimización de rendimiento
          />
          {/* Overlay */}
          <div className={cn("absolute inset-0", overlayColor)} />
        </div>
      )}

      {/* Contenido */}
      <motion.div
        className={cn("relative z-10 flex w-full", verticalAlign)}
        initial="hidden"
        animate="visible"
        variants={selectedAnimation}
      >
        <motion.div
          className={cn("flex flex-col content-section", textAlign, contentPadding, {
            "mx-auto": textAlign === "text-center",
            "ml-auto": textAlign === "text-right",
          })}
          variants={selectedAnimation}
        >
          {/* Título */}
          {heroSection.title && (
            <motion.h2
              className={cn("font-bold mb-4", titleColor, titleSize)}
              style={{
                textShadow: textShadow !== "none" ? textShadow : undefined,
              }}
              variants={selectedAnimation}
            >
              {heroSection.title}
            </motion.h2>
          )}

          {/* Subtítulo */}
          {heroSection.subtitle && (
            <motion.p
              className={cn("mb-6", subtitleColor, subtitleSize)}
              style={{
                textShadow: textShadow !== "none" ? textShadow : undefined,
              }}
              variants={selectedAnimation}
            >
              {heroSection.subtitle}
            </motion.p>
          )}

          {/* Botón */}
          {heroSection.buttonText && heroSection.buttonLink && (
            <motion.div
              className={cn("mt-4", {
                "flex justify-start": textAlign === "text-left",
                "flex justify-center": textAlign === "text-center",
                "flex justify-end": textAlign === "text-right",
              })}
              variants={selectedAnimation}
            >
              <Button
                asChild
                variant={buttonVariant as any}
                size={buttonSize as any}
                className="transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Link href={heroSection.buttonLink}>{heroSection.buttonText}</Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

