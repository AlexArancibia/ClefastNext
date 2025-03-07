"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Beaker, Lightbulb, Leaf, Heart, Users, ChevronRight, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Testimonials } from "./_components/Testimonial"

export default function AboutPage() {
 
  return (
    <main className=" ">
      {/* Hero Section with Video Background */}
      <section className="relative  overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-black to-blue-900/30 z-10"></div>
          <iframe
            src="https://www.youtube.com/embed/O6e7FT2BUhk?autoplay=1&mute=1&loop=1&playlist=O6e7FT2BUhk&controls=0&showinfo=0&rel=0&vq=hd1080"
            title="Clefast Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] min-w-[100%] min-h-[100%] object-cover"
            frameBorder="0"
            allowFullScreen
          ></iframe>

        </div>

        <div className="container mx-auto px-4 py-32 relative z-20 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-6 text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold">Quiénes somos</h1>
            <p className="text-xl md:text-2xl font-bold text-primary">Facilitamos los procesos de lavado industrial</p>
            <p className="text-base md:text-lg">
              Conocemos de cerca los desafíos del lavado industrial, día a día asesoramos a empresas que buscan marcar
              la diferencia en su servicio de lavandería; escuchar nos ha llevado a innovar. Nuestros productos son
              usados en numerosos hoteles y lavanderías del Perú, han desafiado las convenciones con un enfoque
              ecológico y han ayudado a muchas lavanderías a estar más cerca de su éxito comercial al optimizar sus
              procesos de lavado.
            </p>
            <Button
              className="bg-white text-blue-700 hover:bg-blue-50"
              onClick={() =>
                window.open(
                  "https://wa.me/51978303475?text=Hola,%20me%20gustaría%20hablar%20con%20un%20especialista%20de%20Clefast",
                  "_blank",
                )
              }
            >
              Contacte un especialista
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-white pb-0 md:pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8 text-center"
          >
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Nuestra forma de trabajo va más allá de hacer lo de siempre, innovamos y desarrollamos insumos de alta
              calidad que optimizan los procesos y mejoran la eficiencia de cada operación en las industrias del lavado.
              Somos aliados comprometidos en el crecimiento y el éxito de nuestros clientes, contribuyendo al desarrollo
              en la industria del lavado.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Nuestra visión es claramente CLEFAST; nos adaptamos a las necesidades específicas de nuestros clientes y
              buscamos que cada vez sean más las empresas de Latinoamérica que se sumen trabajar con soluciones
              integrales que incluyan productos de alta calidad y tecnologías de limpieza comprometidos con el cuidado
              ambiental.
            </p>
            <div className="pt-6 border-t border-gray-200">
              <p className="text-xl font-semibold text-blue-700 italic">
                "Queremos contribuir a un futuro sostenible, mejorando la calidad de vida de todos y promoviendo
                prácticas responsables de higiene y limpieza de diversas industrias."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Icons Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Beaker className="w-10 h-10 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Desarrollamos productos de calidad superior</h3>
              <p className="text-gray-600 mb-6">
                Nuestros productos están formulados con los más altos estándares de calidad para garantizar resultados
                excepcionales.
              </p>
              <Link href="/productos">
              <Button className="mt-auto">
                Vea nuestros productos
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Nos especializamos acorde al sector</h3>
              <p className="text-gray-600 mb-6">
                Entendemos que cada industria tiene necesidades únicas, por eso ofrecemos soluciones personalizadas.
              </p>
              <a
                href="https://wa.me/51978303475?text=Hola,%20me%20gustaría%20conocer%20más%20sobre%20los%20productos%20de%20Clefast"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-auto bg-primary hover:bg-green-700">
                  Consulte con un asesor
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>


            </motion.div>
          </div>
        </div>
      </section>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Lightbulb className="w-10 h-10 text-amber-500" />,
                title: "Innovación",
                description: "Desafiamos lo convencional para crear productos más efectivos e innovadores",
                color: "bg-amber-50",
                iconBg: "bg-amber-100",
                hoverColor: "bg-amber-500",
                hoverTextColor: "text-white",
                decorativeElement: (
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-amber-300/0 group-hover:bg-amber-300/20 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                ),
              },
              {
                icon: <Leaf className="w-10 h-10 text-green-500" />,
                title: "Sostenibilidad",
                description:
                  "Creemos en un futuro sostenible, desarrollamos productos más amables con el medio ambiente.",
                color: "bg-green-50",
                iconBg: "bg-green-100",
                hoverColor: "bg-green-500",
                hoverTextColor: "text-white",
                decorativeElement: (
                  <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-green-300/0 group-hover:bg-green-300/20 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                ),
              },
              {
                icon: <Heart className="w-10 h-10 text-red-500" />,
                title: "Empatía - Integridad",
                description:
                  "Actuamos con empatía, responsabilidad y compromiso. Creemos en las conexiones genuinas y en crear juntos un impacto positivo.",
                color: "bg-red-50",
                iconBg: "bg-red-100",
                hoverColor: "bg-red-500",
                hoverTextColor: "text-white",
                decorativeElement: (
                  <div className="absolute top-1/2 -translate-y-1/2 -right-6 w-32 h-32 rounded-full bg-red-300/0 group-hover:bg-red-300/20 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                ),
              },
              {
                icon: <Users className="w-10 h-10 text-blue-500" />,
                title: "Valoramos a Nuestros Trabajadores",
                description:
                  "Reconocemos que nuestro mayor activo son las personas que forman parte de este equipo. Creemos en el poder de la colaboración, la diversidad y el crecimiento.",
                color: "bg-blue-50",
                iconBg: "bg-blue-100",
                hoverColor: "bg-blue-500",
                hoverTextColor: "text-white",
                decorativeElement: (
                  <div className="absolute top-1/2 -translate-y-1/2 -left-6 w-32 h-32 rounded-full bg-blue-300/0 group-hover:bg-blue-300/20 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                ),
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${value.color} rounded-xl p-6 text-center group hover:${value.hoverColor} transition-all duration-700 hover:shadow-sm transform hover:-translate-y-1 relative overflow-hidden h-full`}
              >
                {/* Decorative element that appears on hover */}
                {value.decorativeElement}

                {/* Animated highlight effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl"></div>

                <div className="relative z-10 h-full flex flex-col">
                  <div
                    className={`w-16 h-16 ${value.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white   group-hover:scale-110 transition-transform duration-700`}
                  >
                    <div className={`group-hover:${value.hoverTextColor} transition-colors duration-700`}>
                      {value.icon}
                    </div>
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-3 group-hover:${value.hoverTextColor}   group-hover:transform group-hover:scale-105 transition-transform duration-700`}
                  >
                    {value.title}
                  </h3>
                  <p
                    className={`text-gray-700 group-hover:${value.hoverTextColor}   group-hover:font-medium transition-all duration-700`}
                  >
                    {value.description}
                  </p>

                  {/* Animated underline that appears on hover */}
                  <div className="mt-auto pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-0.5 mx-auto bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
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
      <section className="py-16 bg-[url('/fondoproduct.jpg')] bg-cover text-white">
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
      </section>
      <Testimonials />
    </main>
  )
}

