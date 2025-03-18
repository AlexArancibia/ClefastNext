"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import type { HeroSection as HeroSectionType } from "@/types/heroSection"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMainStore } from "@/stores/mainStore"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const { heroSections, fetchHeroSections } = useMainStore()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estados para el carrusel
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Referencias para los timers
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const dragStartX = useRef<number>(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Constantes
  const AUTOPLAY_INTERVAL = 5000 // 5 segundos
  const PROGRESS_UPDATE_INTERVAL = 30 // 30ms para actualización más suave
  const TRANSITION_DURATION = 700 // 700ms para una transición más suave

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
  const filteredSections = useMemo(() => {
    // Verificar si heroSections existe y es un array
    if (!heroSections || !Array.isArray(heroSections)) {
      console.log("heroSections no es un array válido")
      return []
    }

    console.log("Filtrando heroSections:", heroSections.length, "elementos")

    const filtered = heroSections.filter((section) => {
      return (
        section.metadata &&
        typeof section.metadata === "object" &&
        "section" in section.metadata &&
        section.metadata.section === "inicio" &&
        section.isActive
      )
    })

    console.log("Secciones filtradas:", filtered.length)
    return filtered
  }, [heroSections])

  // Variantes para las animaciones de slide
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      scale: 1.02,
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      scale: 0.98,
      opacity: 0,
      zIndex: 0,
    }),
  }

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    if (isTransitioning || filteredSections.length <= 1) return
    setIsTransitioning(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === filteredSections.length - 1 ? 0 : prevIndex + 1))
    resetProgress()

    // Desactivar el estado de transición después de que termine
    setTimeout(() => {
      setIsTransitioning(false)
    }, TRANSITION_DURATION)
  }

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    if (isTransitioning || filteredSections.length <= 1) return
    setIsTransitioning(true)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredSections.length - 1 : prevIndex - 1))
    resetProgress()

    // Desactivar el estado de transición después de que termine
    setTimeout(() => {
      setIsTransitioning(false)
    }, TRANSITION_DURATION)
  }

  // Función para ir a un slide específico
  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning || filteredSections.length <= 1) return

    setIsTransitioning(true)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    resetProgress()

    // Desactivar el estado de transición después de que termine
    setTimeout(() => {
      setIsTransitioning(false)
    }, TRANSITION_DURATION)
  }

  // Función para alternar pausa/reproducción
  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  // Función para reiniciar el progreso
  const resetProgress = () => {
    setProgress(0)

    // Limpiar el timer de progreso existente
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
  }

  // Manejadores para el arrastre (drag)
  const handleDragStart = (_: any, info: PanInfo) => {
    dragStartX.current = info.point.x

    // Pausar el autoplay durante el arrastre
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Pausar la actualización de progreso
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isTransitioning || filteredSections.length <= 1) return

    const dragEndX = info.point.x
    const diff = dragStartX.current - dragEndX
    const threshold = window.innerWidth * 0.15 // 15% del ancho de la pantalla

    // Si el arrastre es significativo, cambiar de slide
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    } else {
      // Si el arrastre no es significativo, reiniciar el progreso
      startProgressTimer()
    }

    // Reiniciar el autoplay si no está pausado
    if (!isPaused) {
      startAutoplay()
    }
  }

  // Función para iniciar el autoplay
  const startAutoplay = () => {
    // Limpiar el timer existente
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Configurar un nuevo timer
    timerRef.current = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        nextSlide()
      }
    }, AUTOPLAY_INTERVAL)
  }

  // Función para iniciar el timer de progreso
  const startProgressTimer = () => {
    // Limpiar el timer existente
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
    }

    // Reiniciar el progreso
    setProgress(0)

    // Configurar un nuevo timer para actualizar el progreso
    progressTimerRef.current = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          const newProgress = prev + (PROGRESS_UPDATE_INTERVAL / AUTOPLAY_INTERVAL) * 100
          return newProgress > 100 ? 100 : newProgress
        })
      }
    }, PROGRESS_UPDATE_INTERVAL)
  }

  // Efecto para el autoplay y progreso
  useEffect(() => {
    if (filteredSections.length <= 1) return

    if (!isPaused && !isTransitioning) {
      startAutoplay()
      startProgressTimer()
    } else {
      // Limpiar timers si está pausado o en transición
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      if (progressTimerRef.current && isPaused) {
        clearInterval(progressTimerRef.current)
        progressTimerRef.current = null
      }
    }

    // Limpiar al desmontar
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current)
      }
    }
  }, [isPaused, isTransitioning, currentIndex, filteredSections.length])

  // Manejar eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredSections.length <= 1) return

      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === " ") {
        togglePause()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isTransitioning, filteredSections.length])

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

  // Si solo hay una sección, mostrarla sin controles
  if (filteredSections.length === 1) {
    const section = filteredSections[0]
    return (
      <div className="w-screen overflow-hidden mx-auto">
        <HeroSlide heroSection={section} />
      </div>
    )
  }

  return (
    <div className="w-screen overflow-hidden relative mx-auto" ref={carouselRef}>
      {/* Carrusel principal */}
      <div
        className="relative"
        style={{
          height: "calc(100vh - 60px)",
          willChange: "transform", // Optimización de rendimiento
        }}
      >
        {/* Cambiamos el modo de "wait" a "sync" para que los slides se superpongan durante la transición */}
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: 200, // Reducido para mayor suavidad
                damping: 25, // Ajustado para evitar rebotes excesivos
                duration: TRANSITION_DURATION / 1000,
              },
              scale: {
                duration: (TRANSITION_DURATION / 1000) * 0.8,
              },
              opacity: {
                duration: (TRANSITION_DURATION / 1000) * 0.5,
              },
            }}
            className="w-full cursor-grab active:cursor-grabbing absolute inset-0"
            style={{
              touchAction: "pan-y",
              willChange: "transform, opacity", // Optimización de rendimiento
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2} // Aumentado para una sensación más natural
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            dragTransition={{
              power: 0.3,
              timeConstant: 300,
              modifyTarget: (target) => Math.round(target / window.innerWidth) * window.innerWidth,
            }}
          >
            <HeroSlide heroSection={filteredSections[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botones de navegación */}
      <div className="absolute inset-0 px-4 md:px-8 flex items-center justify-between pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 text-white shadow-md pointer-events-auto hover:bg-white/30 transition-all duration-200 z-20 hover:scale-110 backdrop-blur-sm"
          onClick={prevSlide}
          aria-label="Slide anterior"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 text-white shadow-md pointer-events-auto hover:bg-white/30 transition-all duration-200 z-20 hover:scale-110 backdrop-blur-sm"
          onClick={nextSlide}
          aria-label="Siguiente slide"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </div>

      {/* Indicadores de avance y botón de pausa */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-20">
        {/* Barras de progreso */}
        <div className="flex gap-2 items-center">
          {filteredSections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative h-1.5 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/60 ${
                index === currentIndex
                  ? "bg-white/50 scale-[1.05] w-[50px] md:w-[80px]"
                  : "bg-white/30 w-[30px] md:w-[50px]"
              }`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
              disabled={isTransitioning}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Botón de pausa/reproducción */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/20 text-white shadow-md hover:bg-white/30 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          onClick={togglePause}
          aria-label={isPaused ? "Reproducir" : "Pausar"}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

// Componente HeroSlide para renderizar cada slide
function HeroSlide({ heroSection }: { heroSection: HeroSectionType }) {
  const { styles = {}, metadata = {} } = heroSection

  // Extraer propiedades del slide
  const { title, subtitle, backgroundImage, mobileBackgroundImage, buttonText, buttonLink } = heroSection

  // Usar imagen de fondo para móvil si está disponible
  const bgImage = mobileBackgroundImage && window.innerWidth < 768 ? mobileBackgroundImage : backgroundImage

  // Extraer estilos
  const {
    overlayColor = "rgba(0,0,0,0.3)",
    textAlign = "left",
    titleColor = "text-white",
    subtitleColor = "text-white",
    buttonVariant = "default",
    textShadow = "0 2px 4px rgba(0,0,0,0.3)",
    contentWidth = "max-w-[600px]",
    verticalAlign = "items-center",
  } = styles

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Imagen de fondo */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage || "/placeholder.svg"}
            alt={title || "Hero image"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={95}
          />
          {/* Overlay con gradiente */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"
            style={{ backgroundColor: overlayColor }}
          />
        </div>
      )}

      <div className={cn("relative z-10 h-full flex", verticalAlign)}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className={cn("space-y-6", contentWidth, {
              "mx-auto text-center": textAlign === "center",
              "ml-auto text-right": textAlign === "right",
              "mr-0": textAlign === "left",
            })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              staggerChildren: 0.1,
            }}
          >
            <motion.h1
              className={cn("text-4xl md:text-6xl font-bold tracking-tight leading-tight", titleColor)}
              style={{ textShadow }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                className={cn("text-lg md:text-xl", subtitleColor)}
                style={{ textShadow }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {subtitle}
              </motion.p>
            )}

            {buttonText && buttonLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  variant={buttonVariant as any}
                  size="lg"
                  className="font-medium hover:scale-105 transition-transform shadow-lg"
                  asChild
                >
                  <Link href={buttonLink}>{buttonText}</Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

