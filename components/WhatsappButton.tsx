"use client"

import { PhoneIcon as WhatsApp } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/51978303475"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
  src="/wsp.png"
  alt="Logo Whatsapp"
  width={40}
  height={40}
  className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12"
/>

      
      <span className="sr-only">Contáctanos por WhatsApp</span>
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </motion.a>
  )
}

