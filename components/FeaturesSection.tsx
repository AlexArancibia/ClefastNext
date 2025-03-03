"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Users2, ShoppingBag, Shield, Truck } from 'lucide-react'

const features = [
  {
    title: "ASESORAMIENTO",
    description: "Les ofrecemos a nuestros clientes capacitación constante del uso adecuado de los productos.",
    icon: Users2,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
  },
  {
    title: "GARANTÍA",
    description: "Para probar la excelente calidad es importante darle una excelente garantía.",
    icon: ShoppingBag,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    title: "CALIDAD",
    description: "Nuestros productos están formulados con insumos biodegradable de máxima calidad.",
    icon: Shield,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
  },
  {
    title: "DISTRIBUCIÓN",
    description: "Atención a toda Lima Metropolitana y envíos a nivel nacional.",
    icon: Truck,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden ">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[url('/gradient1.png')] bg-cover bg-center" />

      <div className="container-section relative py-16 lg:py-24">
        <div className="content-section">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="  text-secondary tracking-tight"
            >
              BRINDANDO EL MEJOR PRODUCTO
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-sm lg:text-base max-w-2xl mx-auto"
            >
              Nos comprometemos a ofrecer productos de la más alta calidad y un servicio excepcional para satisfacer las
              necesidades de nuestros clientes.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/50 hover:bg-white/80 rounded-3xl p-6 shadow-lg shadow-secondary/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center`}>
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="  text-secondary">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
