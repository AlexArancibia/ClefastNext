"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { CONTACT_INFO } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  tipoPersona: z.enum(["natural", "juridica"], {
    required_error: "Por favor seleccione el tipo de persona",
  }),
  nombres: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellidos: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  razonSocial: z.string().optional(),
  documentoTipo: z.string().min(1, "Por favor seleccione un tipo de documento"),
  documentoNumero: z.string().min(1, "Por favor ingrese su número de documento"),
  telefono: z.string().regex(/^\+?[0-9]{6,14}$/, "Número de teléfono inválido"),
  email: z.string().email("Correo electrónico inválido"),
  direccion: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  tipoReclamo: z.enum(["queja", "reclamo"], {
    required_error: "Por favor seleccione el tipo de reclamo",
  }),
  productoServicio: z.string().min(2, "Por favor describa el producto o servicio"),
  montoReclamado: z.string().optional(),
  descripcionReclamo: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  pedidoConsumidor: z.string().min(10, "El pedido debe tener al menos 10 caracteres"),
  aceptaTerminos: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar los términos y condiciones",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function LibroReclamacionesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reclamoNumero, setReclamoNumero] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoPersona: "natural",
      tipoReclamo: "reclamo",
      aceptaTerminos: false,
    },
  })

  const tipoPersona = watch("tipoPersona")
  const tipoReclamo = watch("tipoReclamo")

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Simulación de envío al servidor
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generar número de reclamo aleatorio
      const numeroGenerado = `R-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
      setReclamoNumero(numeroGenerado)

      console.log("Datos del reclamo:", data)

      toast.success("Reclamo registrado correctamente", {
        description: `Su número de reclamo es: ${numeroGenerado}`,
      })

      setSubmitted(true)
      reset()
    } catch (error) {
      console.error("Error al enviar el reclamo:", error)
      toast.error("Error al registrar el reclamo", {
        description: "Por favor, inténtelo de nuevo más tarde.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTipoPersonaChange = (value: "natural" | "juridica") => {
    setValue("tipoPersona", value, { shouldValidate: true })
  }

  const handleTipoReclamoChange = (value: "queja" | "reclamo") => {
    setValue("tipoReclamo", value, { shouldValidate: true })
  }

  const handleDocumentoTipoChange = (value: string) => {
    setValue("documentoTipo", value, { shouldValidate: true })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Libro de Reclamaciones</h1>
            <p className="text-lg opacity-90">
              Registre aquí su queja o reclamo. Nos comprometemos a atenderlo a la brevedad posible.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto">
          {!submitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Formulario de Reclamo</CardTitle>
                <CardDescription>Complete todos los campos requeridos para registrar su reclamo.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Tipo de Persona */}
                  <div className="space-y-3">
                    <Label>Tipo de Persona</Label>
                    <RadioGroup
                      defaultValue={tipoPersona}
                      onValueChange={(value) => handleTipoPersonaChange(value as "natural" | "juridica")}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="natural" id="natural" />
                        <Label htmlFor="natural">Persona Natural</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="juridica" id="juridica" />
                        <Label htmlFor="juridica">Persona Jurídica</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Datos del Consumidor */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Datos del Consumidor</h3>

                    {tipoPersona === "natural" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombres">
                            Nombres <span className="text-red-500">*</span>
                          </Label>
                          <Input id="nombres" {...register("nombres")} />
                          {errors.nombres && <p className="text-sm text-red-500">{errors.nombres.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apellidos">
                            Apellidos <span className="text-red-500">*</span>
                          </Label>
                          <Input id="apellidos" {...register("apellidos")} />
                          {errors.apellidos && <p className="text-sm text-red-500">{errors.apellidos.message}</p>}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="razonSocial">
                          Razón Social <span className="text-red-500">*</span>
                        </Label>
                        <Input id="razonSocial" {...register("razonSocial")} />
                        {errors.razonSocial && <p className="text-sm text-red-500">{errors.razonSocial.message}</p>}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="documentoTipo">
                          Tipo de Documento <span className="text-red-500">*</span>
                        </Label>
                        <Select onValueChange={handleDocumentoTipoChange}>
                          <SelectTrigger id="documentoTipo">
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dni">DNI</SelectItem>
                            <SelectItem value="ce">Carné de Extranjería</SelectItem>
                            <SelectItem value="pasaporte">Pasaporte</SelectItem>
                            <SelectItem value="ruc">RUC</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.documentoTipo && <p className="text-sm text-red-500">{errors.documentoTipo.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="documentoNumero">
                          Número de Documento <span className="text-red-500">*</span>
                        </Label>
                        <Input id="documentoNumero" {...register("documentoNumero")} />
                        {errors.documentoNumero && (
                          <p className="text-sm text-red-500">{errors.documentoNumero.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefono">
                          Teléfono <span className="text-red-500">*</span>
                        </Label>
                        <Input id="telefono" {...register("telefono")} />
                        {errors.telefono && <p className="text-sm text-red-500">{errors.telefono.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Correo Electrónico <span className="text-red-500">*</span>
                        </Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="direccion">
                        Dirección <span className="text-red-500">*</span>
                      </Label>
                      <Input id="direccion" {...register("direccion")} />
                      {errors.direccion && <p className="text-sm text-red-500">{errors.direccion.message}</p>}
                    </div>
                  </div>

                  {/* Tipo de Reclamo */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Tipo</h3>
                    <RadioGroup
                      defaultValue={tipoReclamo}
                      onValueChange={(value) => handleTipoReclamoChange(value as "queja" | "reclamo")}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reclamo" id="reclamo" />
                        <Label htmlFor="reclamo">
                          Reclamo (Disconformidad relacionada a los productos o servicios)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="queja" id="queja" />
                        <Label htmlFor="queja">Queja (Disconformidad no relacionada a los productos o servicios)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Detalle del Reclamo */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detalle del Reclamo</h3>

                    <div className="space-y-2">
                      <Label htmlFor="productoServicio">
                        Producto o Servicio <span className="text-red-500">*</span>
                      </Label>
                      <Input id="productoServicio" {...register("productoServicio")} />
                      {errors.productoServicio && (
                        <p className="text-sm text-red-500">{errors.productoServicio.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="montoReclamado">Monto Reclamado (opcional)</Label>
                      <Input id="montoReclamado" {...register("montoReclamado")} placeholder="S/." />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descripcionReclamo">
                        Descripción <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="descripcionReclamo"
                        {...register("descripcionReclamo")}
                        rows={4}
                        placeholder="Describa detalladamente su reclamo"
                      />
                      {errors.descripcionReclamo && (
                        <p className="text-sm text-red-500">{errors.descripcionReclamo.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pedidoConsumidor">
                        Pedido del Consumidor <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="pedidoConsumidor"
                        {...register("pedidoConsumidor")}
                        rows={4}
                        placeholder="¿Qué solución espera obtener?"
                      />
                      {errors.pedidoConsumidor && (
                        <p className="text-sm text-red-500">{errors.pedidoConsumidor.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Términos y Condiciones */}
                  <div className="flex items-start space-x-2">
                    <Checkbox id="aceptaTerminos" {...register("aceptaTerminos")} className="mt-1" />
                    <Label htmlFor="aceptaTerminos" className="text-sm leading-tight">
                      Declaro que la información proporcionada es verdadera y acepto que mi reclamo sea atendido de
                      acuerdo a los términos y condiciones establecidos por CLEFAST.
                    </Label>
                  </div>
                  {errors.aceptaTerminos && <p className="text-sm text-red-500">{errors.aceptaTerminos.message}</p>}

                  {/* Botón de envío */}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Reclamo"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-green-600">¡Reclamo Registrado!</CardTitle>
                <CardDescription className="text-center">Su reclamo ha sido registrado correctamente.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-lg font-medium mb-2">Número de Reclamo:</p>
                  <p className="text-2xl font-bold text-green-700">{reclamoNumero}</p>
                </div>

                <div className="text-center space-y-4">
                  <p>
                    Hemos recibido su reclamo y será atendido en un plazo máximo de 30 días calendario, de acuerdo a lo
                    establecido en el Código de Protección y Defensa del Consumidor.
                  </p>
                  <p>Se ha enviado una copia de su reclamo al correo electrónico proporcionado.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => setSubmitted(false)}>Registrar Nuevo Reclamo</Button>
              </CardFooter>
            </Card>
          )}

          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Información Adicional</h3>
            <p className="text-gray-700 mb-4">
              De acuerdo con el Código de Protección y Defensa del Consumidor (Ley N° 29571), CLEFAST S.A.C. atenderá su
              reclamo en un plazo máximo de 30 días calendario.
            </p>
            <p className="text-gray-700">
              Para cualquier consulta adicional sobre su reclamo, puede contactarnos a través de:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li>
                <strong>Teléfono:</strong> {CONTACT_INFO.phone.landline}
              </li>
              <li>
                <strong>Correo electrónico:</strong> {CONTACT_INFO.email}
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

