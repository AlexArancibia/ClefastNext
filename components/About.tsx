"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="container-section py-8 lg:py-16">
      <div className="content-section">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-0">
          {/* Image Collage - 40% width on desktop */}
          <div className="w-full lg:w-[40%] relative mx-auto max-w-[400px] lg:max-w-none flex justify-center lg:justify-start lg:pr-4">
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x:0  }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/about1.png"
                alt="Científica en laboratorio"
                width={400}
                height={500}
                className="rounded-3xl object-cover w-[300px] md:w-[450px] h-[400px] md:h-[500px]"
              />
            </motion.div>
            <motion.div
              className="absolute top-6 md:top-12 left-1 md:-left-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Image
                src="/about2.png"
                alt="Profesional con mascarilla"
                width={200}
                height={300}
                className="rounded-2xl object-cover h-[150px] w-[120px] md:h-[200px] md:w-[160px] border-8 border-white shadow-lg"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 md:-bottom-8 left-[230px] md:left-[300px] lg:left-[340px]"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Image
                src="/about3.png"
                alt="Equipo de profesionales"
                width={200}
                height={300}
                className="rounded-2xl object-cover h-[150px] w-[120px] md:h-[200px] md:w-[160px] border-8 border-white shadow-lg"
              />
            </motion.div>
          </div>

          {/* Content - 50% width on desktop */}
          <motion.div
            className="w-full lg:w-[50%] space-y-8 mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-secondary  "
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ¿QUIÉNES SOMOS?
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-sm lg:text-base"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Somos una Empresa conformada por excelentes profesionales con más de 6 años prestando sus servicios en
              laboratorios, detergentes y clientes industriales, elaborados con una fórmula renovada a base de insumos
              biodegradables.
            </motion.p>
            {["Objetivo", "Equipo de Elite"].map((item, index) => (
              <motion.div
                key={item}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 p-1 rounded-full bg-accent/10 text-accent flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-secondary">{item}</h3>
                </div>
                <p className="text-muted-foreground text-sm lg:text-base pl-7">
                  {index === 0
                    ? "simplificar el trabajo a nuestros clientes ofreciéndoles una variedad de productos de primera calidad. Estamos dirigidos a Lavanderías, Hoteles, Hospitales, Minas, Restaurantes y Hogares."
                    : "Brindamos un servicio elevado lo mejor propuesta de valor de nuestros productos, basado en la excelencia, mejora continua e innovación, para tu desarrollo profesional."}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

