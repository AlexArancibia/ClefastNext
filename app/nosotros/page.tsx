"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Beaker, Lightbulb, Leaf, Heart, Users, ChevronRight, MessageSquare, BookOpen, Goal, Eye } from "lucide-react"
import Link from "next/link"
import { Testimonials } from "./_components/Testimonial"
import { AboutHeroSection } from "@/components/AboutHeroSection"
import { MissionVisionSection } from "@/components/MisionVision"

export default function AboutPage() {
 
  return (
    <main className=" ">
      {/* Hero Section with Video Background */}
      <AboutHeroSection />
      {/* Mission and Vision */}
      <MissionVisionSection />

 
 
      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Descubra más sobre nosotros</h2>
            <p className="text-xl text-gray-600">Estos son nuestros pilares y valores</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Innovación",
                description:
                  "Desafiamos lo convencional para crear productos más efectivos e innovadores. Constantemente buscamos nuevas formas de mejorar nuestros procesos y soluciones, adaptándonos a las necesidades cambiantes del mercado y anticipándonos a los desafíos futuros.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
                color: "from-sky-950",
              },
              {
                title: "Sostenibilidad",
                description:
                  "Creemos en un futuro sostenible, desarrollamos productos más amables con el medio ambiente. Nuestro compromiso con la sostenibilidad se refleja en cada aspecto de nuestro negocio, desde la selección de materias primas hasta los procesos de producción y la gestión de residuos.",
                image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
                color: "from-zinc-900",
              },
              {
                title: "Empatía - Integridad",
                description:
                  "Actuamos con empatía, responsabilidad y compromiso. Creemos en las conexiones genuinas y en crear juntos un impacto positivo. Nuestras relaciones con clientes, proveedores y colaboradores se basan en la honestidad, la transparencia y el respeto mutuo, construyendo confianza a largo plazo.",
                image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
                color: "from-red-900/50",
              },
              {
                title: "Valoramos a Nuestros Trabajadores",
                description:
                  "Reconocemos que nuestro mayor activo son las personas que forman parte de este equipo. Creemos en el poder de la colaboración, la diversidad y el crecimiento. Fomentamos un ambiente de trabajo inclusivo donde cada individuo puede desarrollar su potencial y contribuir al éxito colectivo.",
                image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
                color: "from-blue-950",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-[450px] rounded-xl overflow-hidden group shadow-md"
              >
                {/* Imagen de fondo */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={value.image || "/placeholder.svg"}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${value.color} to-transparent opacity-60`}></div>
                </div>

                {/* Título visible inicialmente */}
                <div className="absolute inset-0 flex items-center p-12 justify-center z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="text-3xl font-bold text-white text-center px-6 drop-shadow-md">{value.title}</h3>
                </div>

                {/* Contenido detallado en hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[65%] w-full rounded-t-2xl bg-white  flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 transform translate-y-full group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold mb-3 text-center text-primary">{value.title}</h3>
                  <p className="text-gray-700 text-center overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-300 ">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section - Side-by-Side Accordion */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Sectores a los que servimos</h2>
            <p className="text-base text-gray-600">Soluciones especializadas para cada industria</p>
          </motion.div>

          <div className="flex flex-col md:flex-row h-[500px] gap-2 overflow-hidden">
            {[
              {
                id: "lavanderias",
                title: "Lavanderías",
                image:
                  "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
                description:
                  "Soluciones especializadas para optimizar procesos en lavanderías industriales y comerciales. Nuestros productos están diseñados para mejorar la eficiencia, reducir costos y garantizar resultados excepcionales en cada lavado.",
              },
              {
                id: "hoteles",
                title: "Hoteles",
                image:
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description:
                  "Productos de alta calidad para satisfacer las exigentes necesidades del sector hotelero. Ofrecemos soluciones que garantizan la limpieza impecable de textiles, manteniendo los estándares de calidad que sus huéspedes esperan.",
              },
              {
                id: "minas",
                title: "Minas",
                image:
                  "https://images.unsplash.com/photo-1562167055-1afdc7ac7bca?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                description:
                  "Soluciones robustas para los desafíos únicos de limpieza en el sector minero. Nuestros productos están formulados para enfrentar las condiciones más exigentes, eliminando eficazmente la suciedad industrial pesada y los contaminantes.",
              },
              {
                id: "industrias",
                title: "Industrias",
                image:
                  "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description:
                  "Productos especializados para diversos sectores industriales y sus necesidades específicas. Desde la industria alimentaria hasta la manufacturera, ofrecemos soluciones personalizadas que cumplen con los más altos estándares de calidad y seguridad.",
              },
            ].map((sector, index) => (
              <div
                key={sector.id}
                className="relative flex-1 transition-all duration-500 ease-in-out hover:flex-[3] group overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image src={sector.image || "/placeholder.svg"} alt={sector.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="relative h-full w-full flex flex-col justify-end p-6 z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-3xl transition-all duration-300">
                    {sector.title}
                  </h3>
                  <p className="text-white/0 group-hover:text-white/90 transition-all duration-500 overflow-hidden max-h-0 group-hover:max-h-[200px]">
                    {sector.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 bg-[url('/fondoproduct.jpg')] bg-cover text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-3xl font-bold">¿Listo para optimizar sus procesos de lavado?</h2>
            <p className="text-base md:text-xl text-blue-100">
              Descubra cómo nuestros productos pueden transformar su negocio y mejorar su eficiencia.
            </p>
            <div className="pt-6">
              <Button
                className="bg-white text-blue-700 hover:bg-blue-50 text-base px-8 py-6"
                onClick={() =>
                  window.open(
                    "https://wa.me/51978303475?text=Hola,%20me%20gustaría%20conocer%20más%20sobre%20los%20productos%20de%20Clefast",
                    "_blank",
                  )
                }
              >
                Contáctenos hoy
              </Button>
            </div>
          </motion.div>
        
        </div>
      </section> */}
      {/* <Testimonials /> */}
    </main>
  )
}

