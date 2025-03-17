"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CONTACT_INFO } from "@/lib/constants"

export default function TermsOfUsePage() {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Términos de Uso</h1>
            <p className="text-lg opacity-90">
              Por favor, lea detenidamente estos términos antes de utilizar nuestro sitio web y servicios.
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
              Estos Términos de Uso ("Términos") rigen su acceso y uso del sitio web de CLEFAST S.A.C. (en adelante,
              "CLEFAST", "nosotros" o "nuestro"), incluyendo cualquier contenido, funcionalidad y servicios ofrecidos en
              o a través de nuestro sitio web.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">1. Aceptación de los términos</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Al acceder o utilizar nuestro sitio web, usted acepta estar sujeto a estos Términos de Uso. Si no
                    está de acuerdo con alguna parte de estos términos, no tendrá derecho a acceder al sitio web ni a
                    utilizar nuestros servicios.
                  </p>
                  <p>
                    Estos Términos se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen
                    nuestro sitio web. Al acceder o utilizar cualquier parte del sitio, usted acepta estar sujeto a
                    estos Términos. Si no está de acuerdo con todos los términos y condiciones de este acuerdo, entonces
                    no puede acceder al sitio web ni utilizar ningún servicio.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">2. Uso del sitio</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    La información proporcionada en el sitio web es únicamente para fines informativos generales. Nos
                    reservamos el derecho de modificar o retirar el sitio web, y cualquier servicio o material que
                    proporcionemos en el sitio web, a nuestra entera discreción sin previo aviso.
                  </p>
                  <p>
                    Usted se compromete a utilizar el sitio web solo para fines legítimos y de acuerdo con estos
                    Términos. Específicamente, usted acepta no utilizar el sitio web:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      De cualquier manera que viole cualquier ley o regulación local, nacional o internacional
                      aplicable.
                    </li>
                    <li>
                      Para explotar, dañar o intentar explotar o dañar a menores de cualquier manera exponiéndolos a
                      contenido inapropiado.
                    </li>
                    <li>
                      Para transmitir o procurar el envío de material publicitario o promocional, incluyendo cualquier
                      "correo basura", "cadena de cartas" o "spam".
                    </li>
                    <li>
                      Para hacerse pasar por o intentar hacerse pasar por CLEFAST, un empleado de CLEFAST, otro usuario
                      o cualquier otra persona o entidad.
                    </li>
                    <li>
                      Para participar en cualquier otra conducta que restrinja o inhiba el uso o disfrute del sitio web
                      por parte de cualquier persona, o que pueda dañar a CLEFAST o a los usuarios del sitio web.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">3. Propiedad intelectual</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    El sitio web y todo su contenido, características y funcionalidad (incluyendo pero no limitado a
                    toda la información, software, texto, imágenes, marcas, logotipos, diseños, videos, sonidos, y la
                    selección y disposición de los mismos), son propiedad de CLEFAST, sus licenciantes u otros
                    proveedores de dicho material y están protegidos por las leyes peruanas e internacionales de
                    derechos de autor, marca registrada, patente, secreto comercial y otras leyes de propiedad
                    intelectual o derechos de propiedad.
                  </p>
                  <p>
                    Estos Términos le permiten utilizar el sitio web únicamente para su uso personal, no comercial. No
                    debe reproducir, distribuir, modificar, crear obras derivadas, exhibir públicamente, ejecutar
                    públicamente, republicar, descargar, almacenar o transmitir cualquier material de nuestro sitio web,
                    excepto:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Su computadora puede almacenar temporalmente copias de dichos materiales en la memoria RAM
                      incidental a su acceso y visualización de esos materiales.
                    </li>
                    <li>
                      Puede almacenar archivos que son automáticamente almacenados en caché por su navegador web para
                      mejorar la visualización.
                    </li>
                    <li>
                      Puede imprimir o descargar una copia de un número razonable de páginas del sitio web para su uso
                      personal, no comercial y no para su posterior reproducción, publicación o distribución.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">4. Cuentas de usuario</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Cuando crea una cuenta con nosotros, debe proporcionarnos información precisa, completa y
                    actualizada en todo momento. El no hacerlo constituye un incumplimiento de los Términos, lo que
                    puede resultar en la terminación inmediata de su cuenta en nuestro sitio web.
                  </p>
                  <p>
                    Usted es responsable de salvaguardar la contraseña que utiliza para acceder al sitio web y de
                    cualquier actividad o acción bajo su contraseña, ya sea que su contraseña esté con nuestro servicio
                    o un servicio de terceros.
                  </p>
                  <p>
                    Usted acepta no revelar su contraseña a ningún tercero. Debe notificarnos inmediatamente cuando
                    tenga conocimiento de cualquier violación de seguridad o uso no autorizado de su cuenta.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold">5. Compras y pagos</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Si desea comprar cualquier producto o servicio disponible a través del sitio web ("Compra"), se le
                    puede solicitar que proporcione cierta información relevante para su Compra, incluyendo, sin
                    limitación, su número de tarjeta de crédito, la fecha de vencimiento de su tarjeta de crédito, su
                    dirección de facturación y su información de envío.
                  </p>
                  <p>
                    Usted declara y garantiza que: (i) tiene el derecho legal de usar cualquier tarjeta de crédito u
                    otros métodos de pago en relación con cualquier Compra; y que (ii) la información que nos
                    proporciona es verdadera, correcta y completa.
                  </p>
                  <p>
                    Nos reservamos el derecho de rechazar o cancelar su pedido en cualquier momento por razones que
                    incluyen, pero no se limitan a: disponibilidad del producto o servicio, errores en la descripción o
                    precio del producto o servicio, error en su pedido u otras razones.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-semibold">6. Limitación de responsabilidad</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    En ningún caso CLEFAST, sus directores, empleados, socios, agentes, proveedores o afiliados serán
                    responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo
                    sin limitación, pérdida de beneficios, datos, uso, buena voluntad, u otras pérdidas intangibles,
                    resultantes de (i) su acceso o uso o incapacidad para acceder o usar el sitio web; (ii) cualquier
                    conducta o contenido de terceros en el sitio web; (iii) cualquier contenido obtenido del sitio web;
                    y (iv) acceso no autorizado, uso o alteración de sus transmisiones o contenido, ya sea basado en
                    garantía, contrato, agravio (incluyendo negligencia) o cualquier otra teoría legal, ya sea que
                    hayamos sido informados o no de la posibilidad de tal daño.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-semibold">7. Indemnización</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Usted acepta defender, indemnizar y mantener indemne a CLEFAST, sus afiliados, licenciantes y
                    proveedores de servicios, y sus respectivos funcionarios, directores, empleados, contratistas,
                    agentes, licenciantes, proveedores, sucesores y cesionarios de y contra cualquier reclamación,
                    responsabilidad, daño, juicio, premio, pérdida, costo, gasto o tarifa (incluyendo honorarios
                    razonables de abogados) que surjan de o estén relacionados con su violación de estos Términos.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg font-semibold">8. Ley aplicable y jurisdicción</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Estos Términos y cualquier disputa o reclamación que surja de, o esté relacionada con, ellos, su
                    objeto o formación (incluyendo disputas o reclamaciones no contractuales) se regirán e interpretarán
                    de acuerdo con las leyes de la República del Perú.
                  </p>
                  <p>
                    Cualquier disputa legal que surja de estos Términos será sometida exclusivamente a la jurisdicción
                    de los tribunales de Lima, Perú.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-lg font-semibold">9. Cambios a estos términos</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>
                    Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en
                    cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30
                    días antes de que los nuevos términos entren en vigor.
                  </p>
                  <p>
                    Al continuar accediendo o utilizando nuestro sitio web después de que esas revisiones entren en
                    vigor, usted acepta estar sujeto a los términos revisados. Si no está de acuerdo con los nuevos
                    términos, por favor deje de usar el sitio web.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-lg font-semibold">10. Contáctenos</AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-4">
                  <p>Si tiene alguna pregunta sobre estos Términos, por favor contáctenos:</p>
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
                Al utilizar nuestro sitio web y servicios, usted acepta estos Términos de Uso en su totalidad. Si no
                está de acuerdo con estos términos, por favor no utilice nuestro sitio web o servicios.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

