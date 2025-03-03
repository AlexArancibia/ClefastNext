"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function DeliverySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 " />

      <div className="container-section relative py-4 lg:py-8 mb-8">
        <div className="content-section bg-[url('/gradient2.png')] bg-cover bg-center rounded-3xl p-6 md:p-0">
          <div className="grid md:grid-cols-2 gap-1 lg:gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative h-[200px] md:h-[300px]"
            >
              <Image src="/delivery.png" alt="Clefast Delivery Van" fill className="object-contain" priority />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary tracking-tight">
                CLEFAST PRESENTE EN TODO EL PERÚ.
              </h2>
              <p className="text-muted-foreground text-sm lg:text-lg">
                Despacho a toda Lima Metropolitana y envíos nivel nacional.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

