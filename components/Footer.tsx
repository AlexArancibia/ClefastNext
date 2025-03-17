"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function Footer() {

  const pathname = usePathname()
  const isContactPage = pathname === "/contactenos"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <>
 
      {/* Pre-footer CTA Section with Form */}
      {!isContactPage && (
      <motion.section
        className=" bg-gray-100 bg-center bg-cover py-12 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container-section relative z-10">
          <div className="content-section flex flex-col md:flex-row gap-8 items-center">
            {/* Left column with company info */}
            <motion.div className="w-full md:w-1/2" variants={itemVariants}>
              <h2 className=" text-secondary mb-4">Contáctanos</h2>
              <p className="text-muted-foreground mb-6">
                Estamos aquí para ayudarte. Contáctanos para obtener más información sobre nuestros productos y
                servicios de limpieza industrial.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  <span>{CONTACT_INFO.address}</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  <div>
                    <span className="block">{CONTACT_INFO.phone.mobile}</span>
                    <span className="block">{CONTACT_INFO.phone.landline}</span>
                  </div>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  <span>{CONTACT_INFO.email}</span>
                </li>
              </ul>
    
            </motion.div>

            {/* Right column with form */}
            <motion.div className="w-full md:w-1/2" variants={itemVariants}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-secondary mb-4">Envíanos un mensaje</h3>
                <div className="flex gap-4">
                  <Input type="text" placeholder="Nombre" className="flex-1" required />
                  <Input type="email" placeholder="Email" className="flex-1" required />
                </div>
                <Input type="tel" placeholder="Teléfono" required />
                <Textarea placeholder="Mensaje" rows={4} required />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                  ENVIAR MENSAJE
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      
      </motion.section>
      )}

      {/* Main Footer */}
      <motion.footer
        className="bg-[#011522] text-white pt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container-section pb-12">
          <div className="content-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Social */}
            <motion.div variants={itemVariants}>
              <Image src="/logofooter.png" alt="Clefast Logo" width={200} height={40} className="mb-4" />
              <p className="text-gray-400 text-sm mb-4">
                Productos líquidos biodegradables de alta calidad para la industria del lavado.
              </p>
              <div className="flex gap-4">
                <Link href={CONTACT_INFO.facebook} className="bg-primary hover:bg-primary/90 p-2 rounded-full">
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link href={CONTACT_INFO.instagram} className="bg-primary hover:bg-primary/90 p-2 rounded-full">
                  <Instagram className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contacto
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Industries */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Información</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacidad" className="text-gray-400 hover:text-white">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos-de-uso" className="text-gray-400 hover:text-white">
                    Términos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/reclamaciones" className="text-gray-400 hover:text-white">
                    Libro de Reclamaciónes
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <span>{CONTACT_INFO.address}</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-2 text-primary" />
                  <div>
                    <a href={`tel:${CONTACT_INFO.phone.mobile}`} className="hover:text-white block">
                      {CONTACT_INFO.phone.mobile}
                    </a>
                    <a href={`tel:${CONTACT_INFO.phone.landline}`} className="hover:text-white block">
                      {CONTACT_INFO.phone.landline}
                    </a>
                  </div>
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-2 text-primary" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">
                    {CONTACT_INFO.email}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          
        </div>

        <div className="container-section  border-t border-gray-800 pt-5 py-2">

        <motion.div
            className="content-section flex flex-col md:flex-row justify-between items-center text-sm"
            variants={itemVariants}
          >
            <p className="text-gray-400 text-xs">COPYRIGHT © {new Date().getFullYear()} CLEFAST | DESIGN BY CREADILATAM</p>
            {/* <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 text-xs">
              <Link href="/terminos" className="text-gray-400 hover:text-white">
                TÉRMINOS DE USO
              </Link>
              <Link href="/privacidad" className="text-gray-400 hover:text-white">
                POLÍTICA DE PRIVACIDAD
              </Link>

              <Link href="/reclamaciones" className="text-gray-400 hover:text-white">
                LIBRO DE RECLAMACIONES
              </Link>
            </div> */}
          </motion.div>
        </div>
      </motion.footer>
    </>
  )
}

