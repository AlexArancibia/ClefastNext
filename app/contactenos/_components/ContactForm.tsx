"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"
import { useMainStore } from "@/stores/mainStore"

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().regex(/^\+?[0-9]{6,14}$/, "Número de teléfono inválido"),
  company: z.string().optional(),
  subject: z.string().min(1, "Por favor seleccione un asunto"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type FormValues = z.infer<typeof formSchema>

// Transiciones más rápidas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1, // Reducido de 0.3
      staggerChildren: 0.1, // Reducido de 0.2
    },
  },
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 }, // Reducido el movimiento en Y de 20 a 10
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3, // Reducido el tiempo de animación
    },
  },
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { submitFormEmail } = useMainStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      await submitFormEmail({
        ...data,
        type: "contact-form",
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

  const handleSubjectChange = (value: string) => {
    setValue("subject", value, { shouldValidate: true })
  }

  return (
    <section className="py-16 bg-[url('/gradient1.png')] bg-cover bg-center">
      <div className="container-section">
        <div className="content-section text-center pb-12">
          <motion.h2 
            variants={itemVariants} 
            className="text-gray-900 mb-4"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }} // Animación más rápida
          >
            Contáctanos
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-base md:text-base text-gray-600 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.1 }} // Animación más rápida con pequeño delay
          >
            Estamos aquí para responder a tus preguntas y ayudarte con tus necesidades de limpieza industrial. No dudes
            en ponerte en contacto con nosotros para obtener más información sobre nuestros productos y servicios.
          </motion.p>
        </div>

        <div className="content-section">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <motion.div 
                variants={itemVariants}
                className="relative bg-[url('/contacto.png')] bg-cover bg-center text-primary-foreground p-8"
              >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10">
                  <motion.h2 
                    variants={itemVariants}
                    className="text-2xl font-bold mb-6"
                  >
                    Información de Contacto
                  </motion.h2>
                  <motion.p 
                    variants={itemVariants}
                    className="mb-6 text-primary-foreground/80"
                  >
                    Estamos aquí para ayudarte. No dudes en contactarnos para cualquier consulta sobre nuestros productos
                    o servicios de limpieza industrial.
                  </motion.p>
                  <motion.div 
                    variants={containerVariants} 
                    className="space-y-4"
                  >
                    {[
                      { icon: <MapPin className="w-6 h-6 mr-3 flex-shrink-0" />, text: CONTACT_INFO.address },
                      { 
                        icon: <Phone className="w-6 h-6 mr-3 flex-shrink-0" />, 
                        text: (
                          <>
                            <p>{CONTACT_INFO.phone.mobile}</p>
                            <p>{CONTACT_INFO.phone.landline}</p>
                          </>
                        ) 
                      },
                      { icon: <Mail className="w-6 h-6 mr-3 flex-shrink-0" />, text: CONTACT_INFO.email },
                      { 
                        icon: <Clock className="w-6 h-6 mr-3 flex-shrink-0" />, 
                        text: <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p> 
                      },
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="flex items-start"
                      >
                        {item.icon}
                        <div>{item.text}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="p-8"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6"
                >
                  Envíanos un mensaje
                </motion.h2>
                <motion.form 
                  variants={containerVariants} 
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" {...register("name")} />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" {...register("email")} />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" {...register("phone")} />
                      {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="company">Empresa (opcional)</Label>
                      <Input id="company" {...register("company")} />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="subject">Asunto</Label>
                    <Select onValueChange={handleSubjectChange} defaultValue="">
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Selecciona un asunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulta">Consulta general</SelectItem>
                        <SelectItem value="producto">Información de producto</SelectItem>
                        <SelectItem value="presupuesto">Pedido o Cotización</SelectItem>
                        <SelectItem value="soporte">Solicitud de Pruebas de Lavado</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea id="message" rows={4} {...register("message")} />
                    {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    transition={{ delay: 0.1 }} // Pequeño delay para el botón
                  >
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </motion.div>
                </motion.form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}