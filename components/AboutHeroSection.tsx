"use client"

import { useMainStore } from "@/stores/mainStore"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useState, useEffect, useRef } from "react"
import YouTube from "react-youtube"
import { motion } from "framer-motion"
import { BookOpen, Loader2 } from "lucide-react"

// Caché global para los reproductores de YouTube
const videoLoadedState: Record<string, boolean> = {}

export function AboutHeroSection() {
  const { heroSections, fetchHeroSections } = useMainStore()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Estados para el componente
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [aboutSection, setAboutSection] = useState<any>(null)
  const [videoId, setVideoId] = useState<string>("")
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  const [bgImage, setBgImage] = useState<string>("")
  const [bgVideo, setBgVideo] = useState<string>("")
  const playerRef = useRef<any>(null)

  // Función para extraer ID de video de YouTube
  const extractVideoId = (url: string): string => {
    if (!url) return ""

    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/i,
      /^([a-zA-Z0-9_-]{11})$/, // ID directo
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return ""
  }

  // Fetch de las secciones de héroe
  useEffect(() => {
    const loadHeroSections = async () => {
      try {
        setIsLoading(true)
        await fetchHeroSections()
        setError(null)
      } catch (err) {
        console.error("Error loading hero sections:", err)
        setError("No se pudieron cargar las secciones. Por favor, intenta de nuevo más tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    loadHeroSections()
  }, [fetchHeroSections])

  // Encontrar la sección de quienes-somos y configurar datos
  useEffect(() => {
    if (heroSections && heroSections.length > 0) {
      const section = heroSections.find((section) => section.isActive && section.metadata?.section === "quienes-somos")

      if (section) {
        setAboutSection(section)

        // Configurar imagen de fondo
        const backgroundImage = section.backgroundImage
        const mobileBackgroundImage = section.mobileBackgroundImage
        setBgImage((isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage) || "")

        // Configurar video de fondo
        const backgroundVideo = section.backgroundVideo || (section.styles?.backgroundVideo as string)
        const mobileBackgroundVideo = section.mobileBackgroundVideo || (section.styles?.mobileBackgroundVideo as string)
        const videoUrl = isMobile && mobileBackgroundVideo ? mobileBackgroundVideo : backgroundVideo
        setBgVideo(videoUrl || "")

        // Extraer ID de video si existe
        if (videoUrl) {
          const id = extractVideoId(videoUrl)
          setVideoId(id)
          setIsVideoReady(Boolean(videoLoadedState[id]))
          setHasVideoError(false)
        } else {
          setVideoId("")
          setHasVideoError(false)
        }
      }
    }
  }, [heroSections, isMobile])

  // Efecto para manejar el reproductor de video
  useEffect(() => {
    if (playerRef.current && videoId) {
      try {
        if (playerRef.current.playVideo && typeof playerRef.current.playVideo === "function") {
          playerRef.current.playVideo()
        }
      } catch (error) {
        console.error("Error resuming video playback:", error)
      }
    }

    return () => {
      playerRef.current = null
    }
  }, [videoId])

  // Manejadores para el reproductor de YouTube
  const onVideoReady = (event: any) => {
    try {
      if (!event || !event.target) return

      playerRef.current = event.target

      if (videoId) {
        videoLoadedState[videoId] = true
      }

      event.target.mute()
      event.target.playVideo()

      setTimeout(() => {
        setIsVideoReady(true)
      }, 100)
    } catch (error) {
      console.error("Error in onVideoReady:", error)
    }
  }

  const onVideoError = (event: any) => {
    setHasVideoError(true)
    if (videoId) {
      videoLoadedState[videoId] = false
    }
  }

  // Opciones para el reproductor de YouTube
  const videoOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      mute: 1,
      playlist: videoId, // Necesario para el loop
      cc_load_policy: 0,
      origin: typeof window !== "undefined" ? window.location.origin : "",
      autohide: 1,
      start: 0,
      hl: "es",
      quality: 'hd1080',
      vq: 'hd1080',
      // Configuraciones adicionales para ocultar elementos
      widget_referrer: typeof window !== "undefined" ? window.location.href : "",
      enablecastapi: 0,
      nocookie: true
    },
  }
  // Verificar si hay video para mostrar
  const hasVideo = Boolean(videoId) && !hasVideoError

  // Si está cargando, mostrar un skeleton
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  // Si hay un error, mostrar un mensaje
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  // Si no hay sección de quienes-somos, no mostrar nada
  if (!aboutSection) {
    return null
  }

  return (
    <section className="relative w-full h-[94vh] overflow-hidden">
      {/* Fondo: Video o Imagen */}
      {hasVideo ? (
        <div className="absolute inset-0 overflow-hidden">
          {/* Fallback image shown until video is ready */}
          {bgImage && !isVideoReady && (
            <div className="absolute inset-0">
              <img
                src={bgImage || "/placeholder.svg"}
                alt={aboutSection.title || "Background"}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="absolute inset-0 w-full h-full">
            <YouTube
              videoId={videoId}
              opts={videoOpts}
              onReady={onVideoReady}
              onError={onVideoError}
              className={`absolute inset-0 w-full h-full ${
                isVideoReady ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
              iframeClassName="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[360%] h-[360%] md:w-[150%] md:h-[150%] min-w-full min-h-full"
            />
          </div>

          {/* Overlay con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-black/20 z-10"></div>
        </div>
      ) : bgImage ? (
        <div className="absolute inset-0">
          <img
            src={bgImage || "/placeholder.svg"}
            alt={aboutSection.title || "Hero background"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-black/20 z-10"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-black/20"></div>
      )}

      {/* Contenido del Hero */}
      <div className="relative z-20 flex items-center justify-start w-full h-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="content-section text-white"
        >
          {/* Icono superior */}
          <div className="mb-6 flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <BookOpen />
            </div>
          </div>

          {/* Título y subtítulo */}
          <h1 className="text-4xl md:text-[80px] mb-10 font-bold">{aboutSection.title || "Quiénes somos"}</h1>
          <p className="text-lg md:text-2xl font-semibold mt-2">
            { "Facilitamos los procesos de lavado industrial"}
          </p>

          {/* Descripción */}
          <p className="text-base md:text-lg mt-4 leading-relaxed w-full md:w-1/2">
            {aboutSection.subtitle ||
              "Conocemos de cerca los desafíos del lavado industrial. Día a día asesoramos a empresas que buscan marcar la diferencia en su servicio de lavandería. Escuchar nos ha llevado a innovar. Nuestros productos son usados en numerosos hoteles y lavanderías del Perú, han desafiado las convenciones con un enfoque ecológico y han ayudado a muchas lavanderías a estar más cerca de su éxito comercial al optimizar sus procesos de lavado."}
          </p>

          {/* Botón si existe */}
          {aboutSection.buttonText && aboutSection.buttonLink && (
            <div className="mt-8">
              <Button asChild>
                <Link href={aboutSection.buttonLink}>{aboutSection.buttonText}</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

