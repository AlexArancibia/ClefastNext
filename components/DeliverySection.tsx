"use client"

import { useMainStore } from "@/stores/mainStore"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function DeliveryHeroSection() {
  const { heroSections } = useMainStore()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const deliverySection = heroSections?.find(
    (section) => section.isActive && section.metadata?.section === "delivery"
  )

  if (!deliverySection) return null

  const {
    title,
    subtitle,
    backgroundImage,
    mobileBackgroundImage,
    buttonText,
    buttonLink,
    styles = {},
  } = deliverySection

  const bgImage = isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage
  const height = isMobile ? "500px" : "300px"

  const textAlignClass = styles.textAlign || "text-left"
  const verticalAlignClass = styles.verticalAlign || "items-center"
  const titleColorClass = styles.titleColor || "text-gray-900"
  const subtitleColorClass = styles.subtitleColor || "text-gray-600"

  return (
    <section className="overflow-hidden">
      <div className="container-section py-4 lg:py-8 mb-8">
        <motion.div
          ref={ref} // Se pasó el ref aquí
          className={`content-section rounded-3xl overflow-hidden flex ${verticalAlignClass} relative`}
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: height,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`container mx-auto px-4 md:px-6 flex ${
              textAlignClass === "text-center"
                ? "justify-center"
                : textAlignClass === "text-right"
                ? "justify-end"
                : "justify-start"
            } relative z-10`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className={`max-w-xl p-8 ${textAlignClass}`}
            >
              {title && (
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${titleColorClass}`}>{title}</h2>
              )}

              {subtitle && (
                <p className={`text-sm md:text-base lg:text-lg mb-6 ${subtitleColorClass}`}>{subtitle}</p>
              )}

              {buttonText && buttonLink && (
                <div
                  className={
                    textAlignClass === "text-center"
                      ? "flex justify-center"
                      : textAlignClass === "text-right"
                      ? "flex justify-end"
                      : ""
                  }
                >
                  <Button className="mt-4" asChild>
                    <Link href={buttonLink}>{buttonText}</Link>
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Imagen de Delivery siempre presente y animada cuando entra en vista */}
          <motion.div
            className="absolute right-0 bottom-0 z-20"
            initial={{ x: 200, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="/delivery.png"
              alt="Delivery"
              width={isMobile ? 150 : 300}
              height={isMobile ? 100 : 200}
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
