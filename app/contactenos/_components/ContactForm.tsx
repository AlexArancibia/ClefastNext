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
import { Checkbox } from "@/components/ui/checkbox"
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
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
})

type FormValues = z.infer<typeof formSchema>

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
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
      acceptTerms: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Usar la función del store para enviar el formulario
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

  // Manejar el cambio de valor en el Select
  const handleSubjectChange = (value: string) => {
    setValue("subject", value, { shouldValidate: true })
  }

  return (
    <section className="py-16 bg-[url('/gradient1.png')] bg-cover bg-center">
      <div className="container-section">
        <div className="content-section text-center pb-12">
          <motion.h2 variants={itemVariants} className="text-gray-900 mb-4">
            Contáctanos
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
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
              {/* Información de contacto */}
              <motion.div variants={itemVariants} className="bg-primary text-primary-foreground p-8">
                <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
                  Información de Contacto
                </motion.h2>
                <motion.p variants={itemVariants} className="mb-6 text-primary-foreground/80">
                  Estamos aquí para ayudarte. No dudes en contactarnos para cualquier consulta sobre nuestros productos
                  o servicios de limpieza industrial.
                </motion.p>
                <motion.div variants={containerVariants} className="space-y-4">
                  <motion.div variants={itemVariants} className="flex items-start">
                    <MapPin className="w-6 h-6 mr-3 flex-shrink-0" />
                    <p>{CONTACT_INFO.address}</p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-center">
                    <Phone className="w-6 h-6 mr-3 flex-shrink-0" />
                    <div>
                      <p>{CONTACT_INFO.phone.mobile}</p>
                      <p>{CONTACT_INFO.phone.landline}</p>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-center">
                    <Mail className="w-6 h-6 mr-3 flex-shrink-0" />
                    <p>{CONTACT_INFO.email}</p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-start">
                    <Clock className="w-6 h-6 mr-3 flex-shrink-0" />
                    <div>
                      <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Formulario */}
              <motion.div variants={itemVariants} className="p-8">
                <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
                  Envíanos un mensaje
                </motion.h2>
                <motion.form variants={containerVariants} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Nombre y Email en dos columnas */}
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

                  {/* Teléfono y Empresa en dos columnas */}
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

                  {/* Asunto */}
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="subject">Asunto</Label>
                    <Select onValueChange={handleSubjectChange}>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Selecciona un asunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulta">Consulta general</SelectItem>
                        <SelectItem value="producto">Información de producto</SelectItem>
                        <SelectItem value="presupuesto">Solicitud de presupuesto</SelectItem>
                        <SelectItem value="soporte">Soporte técnico</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>}
                  </motion.div>

                  {/* Mensaje */}
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea id="message" rows={4} {...register("message")} />
                    {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                  </motion.div>

                  {/* Términos y condiciones */}
                  <motion.div variants={itemVariants} className="flex items-start space-x-2">
                    <Checkbox id="acceptTerms" {...register("acceptTerms")} className="mt-1" />
                    <Label htmlFor="acceptTerms" className="text-sm leading-tight">
                      Acepto los términos y condiciones y la política de privacidad. Entiendo que mi información será
                      procesada de acuerdo con la política de privacidad.
                    </Label>
                  </motion.div>
                  {errors.acceptTerms && <p className="text-sm text-red-500 mt-1">{errors.acceptTerms.message}</p>}

                  {/* Botón de envío */}
                  <motion.div variants={itemVariants}>
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

