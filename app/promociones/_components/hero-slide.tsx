"use client"

import { motion } from "framer-motion"
import type { HeroSection as HeroSectionType } from "@/types/heroSection"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useMemo, useState, useEffect, useRef } from "react"
import YouTube from "react-youtube"

interface HeroSlideProps {
  heroSection: HeroSectionType
  animationDelay?: number
}

export function HeroSlide({ heroSection, animationDelay = 0 }: HeroSlideProps) {
  console.log("HeroSlide - Rendering with heroSection:", heroSection.id)

  // Estados para el video
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [videoId, setVideoId] = useState<string>("")
  const [hasVideoError, setHasVideoError] = useState(false)
  const playerRef = useRef<any>(null)

  const { styles = {}, metadata = {} } = heroSection
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Extraer propiedades del slide
  const { title, subtitle, backgroundImage, mobileBackgroundImage, buttonText, buttonLink } = heroSection

  // Extraer propiedades de video
  const backgroundVideo = heroSection.backgroundVideo || (heroSection.styles?.backgroundVideo as string)
  const mobileBackgroundVideo =
    heroSection.mobileBackgroundVideo || (heroSection.styles?.mobileBackgroundVideo as string)

  console.log("HeroSlide - backgroundVideo:", backgroundVideo)
  console.log("HeroSlide - mobileBackgroundVideo:", mobileBackgroundVideo)

  // Usar imagen/video de fondo para móvil si está disponible
  const bgImage = isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage
  const bgVideo = isMobile && mobileBackgroundVideo ? mobileBackgroundVideo : backgroundVideo

  // Extraer estilos con valores por defecto
  const {
    overlayColor = "rgba(0,0,0,0.3)",
    overlayType = "color",
    overlayGradient = {
      colorStart: "rgba(0,0,0,0.5)",
      colorEnd: "rgba(0,0,0,0)",
      angle: 90,
    },
    textAlign = "text-left",
    verticalAlign = "items-center",
    titleColor = "text-white",
    subtitleColor = "text-white",
    buttonVariant = "default",
    buttonSize = "default",
    textShadow = "none",
    contentWidth = {
      mobile: "max-w-full",
      tablet: "max-w-2xl",
      desktop: "max-w-3xl",
    },
    contentPadding = {
      mobile: "py-8 px-4",
      tablet: "py-12 px-6",
      desktop: "py-16 px-8",
    },
    height = {
      mobile: "min-h-screen",
      tablet: "min-h-screen",
      desktop: "min-h-screen",
    },
    titleSize = {
      mobile: "text-[2.125em]",
      tablet: "text-[2em]",
      desktop: "text-[4em]",
    },
    subtitleSize = {
      mobile: "text-[1em]",
      tablet: "text-[1em]",
      desktop: "text-[1em]",
    },
    backgroundPosition = "bg-center",
    backgroundSize = "bg-contain",
    animation = "none",
  } = styles

  // Determinar alineación vertical
  const verticalAlignClass =
    verticalAlign === "items-start" ? "items-start" : verticalAlign === "items-end" ? "items-end" : "items-center"

  // Determinar alineación horizontal
  const textAlignClass =
    textAlign === "text-center" ? "text-center" : textAlign === "text-right" ? "text-right" : "text-left"

  // Determinar ancho de contenido basado en tamaño de pantalla
  const contentWidthValue = useMemo(() => {
    if (isMobile) return contentWidth.mobile
    if (isTablet) return contentWidth.tablet
    return contentWidth.desktop
  }, [isMobile, isTablet, contentWidth])

  // Determinar altura basada en tamaño de pantalla
  const heightValue = useMemo(() => {
    if (isMobile) return height.mobile
    if (isTablet) return height.tablet
    return height.desktop
  }, [isMobile, isTablet, height])

  // Determinar tamaño de título basado en tamaño de pantalla
  const titleSizeValue = useMemo(() => {
    if (isMobile) return titleSize.mobile
    if (isTablet) return titleSize.tablet
    return titleSize.desktop
  }, [isMobile, isTablet, titleSize])

  // Determinar tamaño de subtítulo basado en tamaño de pantalla
  const subtitleSizeValue = useMemo(() => {
    if (isMobile) return subtitleSize.mobile
    if (isTablet) return subtitleSize.tablet
    return subtitleSize.desktop
  }, [isMobile, isTablet, subtitleSize])

  // Determinar padding de contenido basado en tamaño de pantalla
  const paddingValue = useMemo(() => {
    if (isMobile) return contentPadding.mobile
    if (isTablet) return contentPadding.tablet
    return contentPadding.desktop
  }, [isMobile, isTablet, contentPadding])

  // Extraer ID de video de YouTube
  useEffect(() => {
    const extractVideoId = (url: string): string => {
      if (!url) return ""

      console.log("HeroSlide - Extracting video ID from:", url)

      // Patrones comunes de URLs de YouTube
      const patterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
        /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/i,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/i,
        /^([a-zA-Z0-9_-]{11})$/, // ID directo
      ]

      for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match && match[1]) {
          console.log("HeroSlide - Extracted video ID:", match[1])
          return match[1]
        }
      }

      console.warn("HeroSlide - Could not extract video ID from URL:", url)
      return ""
    }

    if (bgVideo) {
      const id = extractVideoId(bgVideo)
      setVideoId(id)
      setIsVideoReady(false)
      setHasVideoError(false)
      console.log("HeroSlide - Set video ID:", id)
    } else {
      setVideoId("")
      setHasVideoError(false)
      console.log("HeroSlide - No video URL provided")
    }
  }, [bgVideo])

  // Manejadores para el reproductor de YouTube
  const onVideoReady = (event: any) => {
    console.log("HeroSlide - YouTube player ready")
    playerRef.current = event.target

    // Asegurarnos de que el video está silenciado y se reproduce automáticamente
    event.target.mute()
    event.target.playVideo()

    // Establecer isReady después de un pequeño retraso para asegurar que el video está reproduciéndose
    setTimeout(() => {
      console.log("HeroSlide - Video playback started")
      setIsVideoReady(true)
    }, 300)
  }

  const onVideoError = (event: any) => {
    console.error("HeroSlide - Error loading YouTube video:", event)
    setHasVideoError(true)
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
      iv_load_policy: 3, // Hide video annotations
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      mute: 1,
      playlist: videoId, // Required for looping
      cc_load_policy: 0, // Disable closed captions
      origin: typeof window !== "undefined" ? window.location.origin : "",
    },
  }

  // Obtener estilo de overlay
  const getOverlayStyle = () => {
    if (overlayType === "none") {
      return {}
    }

    if (overlayType === "gradient" && overlayGradient) {
      const { colorStart, colorEnd, angle } = overlayGradient
      return {
        background: `linear-gradient(${angle}deg, ${colorStart}, ${colorEnd})`,
      }
    }

    // Default fallback
    return { backgroundColor: overlayColor }
  }

  // Verificar si hay video para mostrar
  const hasVideo = Boolean(videoId) && !hasVideoError
  console.log("HeroSlide - Has video:", hasVideo, "Video ID:", videoId, "Has error:", hasVideoError)

  return (
    <div className={cn("relative w-full overflow-hidden", heightValue)}>
      {/* Fondo: Video o Imagen */}
      {hasVideo ? (
        <div className="absolute inset-0 overflow-hidden">
          {/* Fallback image shown until video is ready */}
          {bgImage && !isVideoReady && (
            <div className="absolute inset-0">
              <Image
                src={bgImage || "/placeholder.svg"}
                alt={title || "Background"}
                fill
                className={cn("object-cover bg-center", backgroundSize, backgroundPosition)}
                priority
                sizes="100vw"
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
              } transition-opacity duration-500`}
              iframeClassName="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] min-w-full min-h-full"
            />
          </div>

          {/* Overlay personalizable */}
          <div className="absolute inset-0 pointer-events-none" style={getOverlayStyle()} />
        </div>
      ) : bgImage ? (
        <div className="absolute inset-0">
          <Image
            src={bgImage || "/placeholder.svg"}
            alt={title || "Hero background"}
            fill
            priority
            className={cn("object-cover", backgroundSize, backgroundPosition)}
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0" style={getOverlayStyle()} />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800" />
      )}

      {/* Contenido */}
      <div className={cn("relative z-10 h-full flex", verticalAlignClass)}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className={cn(
              "space-y-6",
              textAlignClass,
              {
                "mx-auto": textAlignClass === "text-center",
                "ml-auto": textAlignClass === "text-right",
                "mr-auto": textAlignClass === "text-left",
              },
              contentWidthValue,
              paddingValue,
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2 + animationDelay,
            }}
          >
            {title && (
              <motion.h1
                className={cn(titleColor, titleSizeValue)}
                style={{
                  textShadow: textShadow !== "none" ? textShadow : undefined,
                  lineHeight: 1.2,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: animationDelay }}
              >
                {title}
              </motion.h1>
            )}

            {subtitle && (
              <motion.p
                className={cn(subtitleColor, subtitleSizeValue)}
                style={{
                  textShadow: textShadow !== "none" ? textShadow : undefined,
                  lineHeight: 1.5,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + animationDelay }}
              >
                {subtitle}
              </motion.p>
            )}

            {buttonText && buttonLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + animationDelay }}
              >
                <Button
                  variant={buttonVariant as any}
                  size={buttonSize as any}
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

