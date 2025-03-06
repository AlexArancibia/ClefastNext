"use client"

import { useCartStore } from "@/stores/cartStore"
import { useMainStore } from "@/stores/mainStore"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore()
  const { shopSettings } = useMainStore()
  const [couponCode, setCouponCode] = useState("")

  const currency = shopSettings[0]?.defaultCurrency

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>
        <p className="text-gray-600 mb-4">Tu carrito está vacío.</p>
        <Link href="/productos" passHref>
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuar comprando
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {items.map((item) => (
            <div key={item.variant.id} className="flex items-center gap-4 py-4 border-b">
              <Image
                src={item.product.imageUrls[0] || "/placeholder.svg"}
                alt={item.product.title}
                width={80}
                height={80}
                className="object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.product.title}</h3>
                <p className="text-sm text-gray-500">
                  {Object.entries(item.variant.attributes)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {currency?.symbol}
                  {(item.variant.prices[0].price * item.quantity).toFixed(2)}
                </p>
                <Button size="icon" variant="ghost" onClick={() => removeItem(item.variant.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-between items-center">
            <Button variant="outline" onClick={clearCart}>
              Vaciar carrito
            </Button>
            <Link href="/productos" passHref>
              <Button variant="link">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continuar comprando
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {currency?.symbol}
                {getTotal().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>Calculado en el checkout</span>
            </div>
          </div>
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                {currency?.symbol}
                {getTotal().toFixed(2)}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Código de cupón"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button variant="outline">Aplicar</Button>
            </div>
            <Button className="w-full">Proceder al pago</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

