"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Evitar ejecución durante SSR
    if (typeof window === "undefined") {
      return
    }

    const media = window.matchMedia(query)

    // Actualizar el estado inicialmente
    setMatches(media.matches)

    // Definir callback para cambios
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Agregar listener
    media.addEventListener("change", listener)

    // Limpiar
    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}

