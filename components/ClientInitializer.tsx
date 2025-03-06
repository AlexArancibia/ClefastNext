"use client";

import { useInitializer } from "@/hooks/useInitializer";

export function ClientInitializer() {
  useInitializer(); // Inicializa los datos globales al cargar la app
  return null; // No renderiza nada en pantalla
}
