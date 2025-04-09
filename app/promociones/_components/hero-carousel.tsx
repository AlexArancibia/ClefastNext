"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import type { HeroSection } from "@/types/heroSection"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { HeroSlide } from "./hero-slide"

interface HeroCarouselProps {
  heroSections: HeroSection[]
}

export function HeroCarousel({ heroSections }: HeroCarouselProps) {
  // Filtrar solo las secciones de héroe con metadata.section igual a "promociones"
  const filteredHeroSections = useMemo(() => {
    return heroSections.filter(
      (section) =>
        section.metadata &&
        typeof section.metadata === "object" &&
        "section" in section.metadata &&
        section.metadata.section === "promociones",
    )
  }, [heroSections])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const dragStartX = useRef<number>(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Constantes
  const AUTOPLAY_INTERVAL = 5000 // 5 segundos
  const PROGRESS_UPDATE_INTERVAL = 30 // 30ms para actualización más suave
  const TRANSITION_DURATION = 700 // 700ms para una transición más suave

  // Variantes para las animaciones de slide
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      scale: 1.02,
      zIndex: 0,
    }),
    center: {
      x: 0,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      scale: 0.98,
      zIndex: 0,
    }),
  }

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    if (isTransitioning || filteredHeroSections.length <= 1) return
    setIsTransitioning(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === filteredHeroSections.length - 1 ? 0 : prevIndex + 1))
    resetProgress()

    // Desactivar el estado de transición después de que termine
    setTimeout(() => {
      setIsTransitioning(false)
    }, TRANSITION_DURATION)
  }

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    if (isTransitioning || filteredHeroSections.length <= 1) return
    setIsTransitioning(true)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredHeroSections.length - 1 : prevIndex - 1))
    resetProgress()

    // Desactivar el estado de transición después de que termine
    setTimeout(() => {
      setIsTransitioning(false)
    }, TRANSITION_DURATION)
  }

  // Función para ir a un slide específico
  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning || filteredHeroSections.length <= 1) return

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
    if (isTransitioning || filteredHeroSections.length <= 1) return

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
    if (filteredHeroSections.length <= 1) return

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
  }, [isPaused, isTransitioning, currentIndex, filteredHeroSections.length])

  // Manejar eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredHeroSections.length <= 1) return

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
  }, [isTransitioning, filteredHeroSections.length])

  // Si no hay secciones después del filtrado, no mostrar nada
  if (filteredHeroSections.length === 0) return null

  // Si solo hay una sección, mostrarla sin controles
  if (filteredHeroSections.length === 1) {
    return (
      <div className="w-screen overflow-hidden mx-auto">
        <HeroSlide heroSection={filteredHeroSections[0]} />
      </div>
    )
  }

  return (
    <div className="w-screen overflow-hidden relative mx-auto" ref={carouselRef}>
      {/* Carrusel principal */}
      <div
        className="relative h-[92vh] "
 
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
            <HeroSlide heroSection={filteredHeroSections[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botones de navegación */}
      <div className="absolute hidden inset-0 px-8 md:flex items-center justify-between pointer-events-none">
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/80 text-foreground shadow-md pointer-events-auto ml-4 hover:bg-background/90 transition-all duration-200 z-20 hover:scale-110"
          onClick={prevSlide}
          aria-label="Slide anterior"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/80 text-foreground shadow-md pointer-events-auto mr-4 hover:bg-background/90 transition-all duration-200 z-20 hover:scale-110"
          onClick={nextSlide}
          aria-label="Siguiente slide"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Indicadores de avance y botón de pausa */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-20">
        {/* Barras de progreso */}
        <div className="flex gap-3 items-center">
          {filteredHeroSections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative h-1.5 rounded-full overflow-hidden transition-all duration-300 hover:bg-background/50 ${
                index === currentIndex
                  ? "bg-background/40 scale-[1.05]  w-[60px] md:w-[100px]"
                  : "bg-background/30 w-[40px] md:w-[70px]"
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
          className="h-8 w-8 rounded-full bg-background/80 text-foreground shadow-md hover:bg-background/90 transition-all duration-200 hover:scale-110"
          onClick={togglePause}
          aria-label={isPaused ? "Reproducir" : "Pausar"}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

