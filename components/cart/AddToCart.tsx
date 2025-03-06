"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cartStore"
import type { Product,   } from "@/types/product"
import { ProductVariant } from "@/types/productVariant"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  product: Product
  variant: ProductVariant
  quantity: number
}

export function AddToCartButton({ product, variant, quantity }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product, variant, quantity)
  }

  return (
    <Button onClick={handleAddToCart} className="w-full">
      <ShoppingCart className="mr-2 h-4 w-4" />
      Agregar al carrito
    </Button>
  )
}

