"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ShieldCheck, TrendingUp, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    badge: "DESDE EL 2016",
    title: 'SOLUCIONES DE  LIMPIEZA INDUSTRIAL',
    description:
      "Productos líquidos biodegradables de alta calidad para la industria del lavado. Optimizamos sus procesos con soluciones innovadoras y sostenibles.",
    buttonText: "Ver Productos",
    image: "/hero1.png",
    badges: [
      {
        icon: <TrendingUp className="h-5 w-5 md:h-7 md:w-7" />,
        title: "Productos",
        subtitle: "de la mejor calidad",
      },
      {
        icon: <ShieldCheck className="h-5 w-5 md:h-7 md:w-7" />,
        title: "Protección",
        subtitle: "y limpieza garantizadas",
      },
    ],
  },
  {
    badge: "ENVÍOS NACIONALES",
    title: "LLEGAMOS A TODO EL PERÚ",
    description:
      "Nuestros productos de limpieza industrial ahora están disponibles en todo el país. Entrega rápida y segura para mantener tu negocio en funcionamiento.",
    buttonText: "Consultar Envíos",
    image: "/hero2.png",
    badges: [
      {
        icon: <Truck className="h-5 w-5 md:h-7 md:w-7" />,
        title: "Envíos",
        subtitle: "a nivel nacional",
      },
      {
        icon: <ShieldCheck className="h-5 w-5 md:h-7 md:w-7" />,
        title: "Garantía",
        subtitle: "de entrega segura",
      },
    ],
  },
]

export function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 4000) // Cambiar slide cada 6 segundos

    return () => clearInterval(interval)
  }, [])

  const currentSlide = slides[currentSlideIndex]

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  return (
    <section className="bg-gradient-to-tr from-[#fbfeff]  to-[#E2F6FC] relative">
      <div className="container-section py-16 lg:py-20">
        <div className="content-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[700px] md:min-h-[500px] ">
            {/* Left Column - Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <Badge
                  variant="secondary"
                  className="bg-white text-sm md:text-base text-accent hover:bg-gray-50 transition-colors gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  {currentSlide.badge}
                </Badge>

                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary tracking-tight leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {currentSlide.title}
                </motion.h1>

                <motion.p
                  className="text-sm md:text-base text-muted-foreground max-w-[600px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {currentSlide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium">
                    {currentSlide.buttonText}
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right Column - Image */}
            <div className="relative h-[350px] md:h-full  ">
              {/* Quality Badges */}
              <AnimatePresence>
                {currentSlide.badges.map((badge, index) => (
                  <motion.div
                    key={`${currentSlideIndex}-${index}`}
                    className={`absolute ${index === 0 ? "top-4 right-4" : "bottom-4 left-4"} z-[100] bg-white rounded-full shadow-lg p-2 px-3 md:p-3 md:px-6 flex items-center gap-2`}
                    initial={{ opacity: 0, scale: 0.8, y: index === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: index === 0 ? -20 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-center shadow-lg shadow-primary/40 text-primary p-1 bg-primary text-white rounded-md">
                      {badge.icon}
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-secondary">{badge.title}</p>
                      <p className="text-muted-foreground text-xs -mt-1">{badge.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 overflow-hidden flex items-center h-full justify-center p-10 md:p-0"
                >
                  <Image
                    src={currentSlide.image || "/placeholder.svg"}
                    alt="Imagen representativa"
                    width={500}
                    height={500}
                    className="object-cover "
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Only visible on desktop */}
      <div className=" ">
        <button
          onClick={prevSlide}
          className="absolute z-[9999] text-accent left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 transition-colors rounded-full p-2"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 text-secondary" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute z-[9999] text-accent  right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 transition-colors rounded-full p-2"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-6 h-6 text-secondary" />
        </button>
      </div>
    </section>
  )
}

