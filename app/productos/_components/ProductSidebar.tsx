import Image from "next/image"
import Link from "next/link"
import { Truck, CreditCard, Package, FlaskConical } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductSidebarProps {
  product: Product
}

export function ProductSidebar({ product }: ProductSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Destacados */}
      <div className="space-y-3">
        <div className="border-2 border-blue-100 rounded-2xl p-4 bg-blue-50">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <FlaskConical className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900">PRUEBAS DE LAVADO</p>
              <p className="text-blue-600 font-medium">GRATIS</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-blue-100 rounded-2xl p-4 bg-blue-50">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900">ENVÍOS A TODO</p>
              <p className="text-blue-600 font-medium">EL PERÚ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Métodos de pago
        </h3>
        <div className="flex flex-wrap gap-2">
          <Image src="/visa.png" alt="Visa" width={40} height={25} />
          <Image src="/mastercard.png" alt="Mastercard" width={40} height={25} />
          <Image src="/yape.png" alt="Yape" width={40} height={25} />
          <Image src="/plin.png" alt="Plin" width={40} height={25} />
        </div>
      </div>

      {/* Productos similares */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Productos similares
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <Link key={item} href="#" className="flex items-center gap-3 group">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                <Image src="/placeholder.svg" alt="Producto similar" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                  Producto similar {item}
                </p>
                <p className="text-sm text-primary font-medium">S/ 199.90</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

