"use client"

import { useCartStore } from "@/stores/cartStore"
import { Button } from "@/components/ui/button"
import { useMainStore } from "@/stores/mainStore"
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"

export function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore()
  const { shopSettings } = useMainStore()
  const currency = shopSettings[0]?.defaultCurrency

  if (items.length === 0) {
    return <div className="p-4 text-center">Tu carrito está vacío</div>
  }

  return (
    <div className="p-4">
      {items.map((item) => (
        <div key={item.variant.id} className="flex items-center gap-4 py-2 border-b">
          <Image
            src={item.product.imageUrls[0] || "/placeholder.svg"}
            alt={item.product.title}
            width={50}
            height={50}
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
            <span>{item.quantity}</span>
            <Button size="icon" variant="outline" onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {currency.symbol}
              {(item.variant.prices[0].price * item.quantity).toFixed(2)}
            </p>
            <Button size="icon" variant="ghost" onClick={() => removeItem(item.variant.id)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-between items-center">
        <Button variant="outline" onClick={clearCart}>
          Vaciar carrito
        </Button>
        <div className="text-right">
          <p className="text-lg font-bold">
            Total: {currency.symbol}
            {getTotal().toFixed(2)}
          </p>
          <Button className="mt-2">Proceder al pago</Button>
        </div>
      </div>
    </div>
  )
}

