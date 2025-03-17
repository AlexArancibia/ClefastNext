"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CONTACT_INFO } from "@/lib/constants"

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-lg opacity-90">
              En CLEFAST nos comprometemos a proteger su privacidad y a tratar sus datos personales con transparencia.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8"
        >
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-6">Última actualización: 17 de marzo de 2025</p>

            <p className="mb-8">
              CLEFAST S.A.C. (en adelante, "CLEFAST", "nosotros" o "nuestro") se compromete a proteger su privacidad.
              Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos su información
              cuando visita nuestro sitio web o utiliza nuestros servicios.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">1. Información que recopilamos</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>Podemos recopilar los siguientes tipos de información:</p>
                  <h4 className="font-semibold text-base">1.1 Información personal</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Información de contacto (nombre, dirección de correo electrónico, número de teléfono, dirección
                      postal)
                    </li>
                    <li>Información de la empresa (nombre de la empresa, cargo)</li>
                    <li>Información de la cuenta (nombre de usuario, contraseña)</li>
                    <li>Información de pago (detalles de la tarjeta de crédito, información bancaria)</li>
                  </ul>

                  <h4 className="font-semibold text-base">1.2 Información de uso</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Información sobre cómo utiliza nuestro sitio web y servicios</li>
                    <li>Dirección IP, tipo de navegador, proveedor de servicios de Internet</li>
                    <li>
                      Páginas de referencia/salida, archivos vistos en nuestro sitio (por ejemplo, páginas HTML,
                      gráficos)
                    </li>
                    <li>Sistema operativo, fecha/hora y datos de clickstream</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">2. Cómo utilizamos su información</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>Utilizamos la información que recopilamos para los siguientes fines:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Proporcionar, mantener y mejorar nuestros servicios</li>
                    <li>Procesar transacciones y enviar notificaciones relacionadas</li>
                    <li>Enviar información técnica, actualizaciones, alertas de seguridad y mensajes de soporte</li>
                    <li>Responder a sus comentarios, preguntas y solicitudes</li>
                    <li>Comunicarnos con usted sobre productos, servicios, ofertas y eventos</li>
                    <li>Monitorear y analizar tendencias, uso y actividades en relación con nuestros servicios</li>
                    <li>Detectar, investigar y prevenir actividades fraudulentas y no autorizadas</li>
                    <li>Cumplir con obligaciones legales</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">3. Compartir su información</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>Podemos compartir su información personal en las siguientes circunstancias:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Con proveedores de servicios que trabajan en nuestro nombre</li>
                    <li>Para cumplir con la ley, prevenir fraudes, o proteger nuestros derechos</li>
                    <li>En relación con una fusión, venta de activos de la empresa, financiación o adquisición</li>
                    <li>Con su consentimiento o según sus instrucciones</li>
                  </ul>
                  <p>No vendemos ni alquilamos su información personal a terceros para fines de marketing.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">
                  4. Cookies y tecnologías similares
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro
                    sitio web y almacenar cierta información. Las cookies son archivos con una pequeña cantidad de datos
                    que pueden incluir un identificador único anónimo.
                  </p>
                  <p>Utilizamos los siguientes tipos de cookies:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Cookies necesarias:</strong> Esenciales para el funcionamiento del sitio web
                    </li>
                    <li>
                      <strong>Cookies de preferencias:</strong> Permiten recordar información que cambia el
                      comportamiento o aspecto del sitio
                    </li>
                    <li>
                      <strong>Cookies estadísticas:</strong> Ayudan a entender cómo los visitantes interactúan con el
                      sitio
                    </li>
                    <li>
                      <strong>Cookies de marketing:</strong> Utilizadas para rastrear a los visitantes en los sitios web
                    </li>
                  </ul>
                  <p>
                    Puede instruir a su navegador para que rechace todas las cookies o para que le avise cuando se envía
                    una cookie. Sin embargo, si no acepta cookies, es posible que no pueda utilizar algunas partes de
                    nuestro servicio.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold">5. Seguridad de los datos</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    La seguridad de sus datos es importante para nosotros, pero recuerde que ningún método de
                    transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos
                    esforzamos por utilizar medios comercialmente aceptables para proteger su información personal, no
                    podemos garantizar su seguridad absoluta.
                  </p>
                  <p>Implementamos medidas de seguridad como:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encriptación de datos sensibles</li>
                    <li>Protocolos seguros para la transmisión de datos (HTTPS)</li>
                    <li>Acceso restringido a la información personal</li>
                    <li>Monitoreo regular de nuestros sistemas para detectar vulnerabilidades</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-semibold">6. Sus derechos de privacidad</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Dependiendo de su ubicación, puede tener ciertos derechos relacionados con su información personal,
                    como:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Derecho a acceder a la información personal que tenemos sobre usted</li>
                    <li>Derecho a rectificar o actualizar información inexacta o incompleta</li>
                    <li>Derecho a eliminar su información personal</li>
                    <li>Derecho a restringir u oponerse al procesamiento de su información</li>
                    <li>Derecho a la portabilidad de datos</li>
                    <li>Derecho a retirar el consentimiento</li>
                  </ul>
                  <p>
                    Para ejercer estos derechos, póngase en contacto con nosotros utilizando la información
                    proporcionada en la sección "Contáctenos".
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-semibold">7. Retención de datos</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Conservaremos su información personal solo durante el tiempo necesario para cumplir con los fines
                    para los que la recopilamos, incluido el cumplimiento de requisitos legales, contables o de
                    informes.
                  </p>
                  <p>
                    Para determinar el período de retención adecuado, consideramos la cantidad, naturaleza y
                    sensibilidad de la información personal, el riesgo potencial de daño por uso o divulgación no
                    autorizados, los fines para los que procesamos su información personal y si podemos lograr esos
                    fines a través de otros medios.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg font-semibold">8. Menores de edad</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Nuestros servicios no están dirigidos a personas menores de 18 años. No recopilamos a sabiendas
                    información personal de niños menores de 18 años. Si descubrimos que un niño menor de 18 años nos ha
                    proporcionado información personal, eliminaremos inmediatamente dicha información de nuestros
                    servidores.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-lg font-semibold">
                  9. Cambios a esta política de privacidad
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier
                    cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "última
                    actualización" en la parte superior.
                  </p>
                  <p>
                    Se le aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio. Los cambios
                    a esta Política de Privacidad son efectivos cuando se publican en esta página.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-lg font-semibold">10. Contáctenos</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos:</p>
                  <ul className="list-none space-y-2">
                    <li>
                      <strong>Dirección:</strong> {CONTACT_INFO.address}
                    </li>
                    <li>
                      <strong>Teléfono:</strong> {CONTACT_INFO.phone.landline}
                    </li>
                    <li>
                      <strong>Correo electrónico:</strong> {CONTACT_INFO.email}
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Al utilizar nuestro sitio web y servicios, usted acepta los términos de esta Política de Privacidad. Si
                no está de acuerdo con esta política, por favor no utilice nuestro sitio web o servicios.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

