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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useMainStore } from "@/stores/mainStore"
import { useState } from "react"

// Definimos el schema de validación
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().regex(/^\+?[0-9]{6,14}$/, "Número de teléfono inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type FormValues = z.infer<typeof formSchema>

export function Footer() {
  const pathname = usePathname()
  const isContactPage = pathname === "/contactenos"
  const { submitFormEmail } = useMainStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      await submitFormEmail({
        ...data,
        type: "footer-form", // Diferente tipo para identificar el origen
      })

      toast.success("Formulario enviado", {
        description: "Gracias por contactarnos. Te responderemos pronto.",
      })
      reset()
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      toast.error("Error al enviar el formulario", {
        description: "Por favor, inténtalo de nuevo más tarde.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Pre-footer CTA Section with Form */}
      {!isContactPage && (
        <motion.section
          className="bg-gray-100 bg-center bg-cover py-12 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="container-section relative z-10">
            <div className="content-section flex flex-col md:flex-row gap-8 items-center">
              {/* Left column with company info */}
              <motion.div className="w-full md:w-1/2" variants={itemVariants}>
                <h2 className="text-secondary mb-4">Contáctanos</h2>
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
                <form 
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-4 bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-secondary mb-4">Envíanos un mensaje</h3>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input 
                        type="text" 
                        placeholder="Nombre" 
                        {...register("name")}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        {...register("email")}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Input 
                      type="tel" 
                      placeholder="Teléfono" 
                      {...register("phone")}
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Textarea 
                      placeholder="Mensaje" 
                      rows={4} 
                      {...register("message")}
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "ENVIAR MENSAJE"}
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
              <Image 
                src="/logofooter.png" 
                alt="Clefast Logo" 
                width={100} 
                height={50} 
                className="mb-4 object-contain" 
              />
              <p className="text-gray-400 text-sm mb-4">
                Productos líquidos biodegradables de alta calidad para la industria del lavado.
              </p>
              <div className="flex gap-4">
                <Link 
                  href={CONTACT_INFO.facebook} 
                  className="bg-primary hover:bg-primary/90 p-2 rounded-full"
                  target="_blank"
                >
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link 
                  href={CONTACT_INFO.instagram} 
                  className="bg-primary hover:bg-primary/90 p-2 rounded-full"
                  target="_blank"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Enlaces de Interés</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Inicio
                  </Link>
                </li> 
                <li>
                  <Link href="/nosotros" className="text-gray-400 hover:text-white">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="text-gray-400 hover:text-white">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link href="/promociones" className="text-gray-400 hover:text-white">
                    Promociones
                  </Link>
                </li>
                <li>
                  <Link href="/catalogo" className="text-gray-400 hover:text-white">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Information */}
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
                    Libro de Reclamaciones
                  </Link>
                </li>
                <li>
                  <Link href="/contactenos" className="text-gray-400 hover:text-white">
                    Contacto
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
        </div>

        {/* Footer Bottom */}
        <div className="container-section border-t border-gray-800 pt-5 py-2">
          <motion.div
            className="content-section flex flex-col md:flex-row justify-between items-center text-sm"
            variants={itemVariants}
          >
            <p className="text-gray-400 text-xs">
              COPYRIGHT © {new Date().getFullYear()} CLEFAST | DESIGN BY CREADILATAM
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </>
  )
}