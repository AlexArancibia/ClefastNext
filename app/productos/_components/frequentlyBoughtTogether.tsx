"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cartStore"
import { useMainStore } from "@/stores/mainStore"
import { Plus } from "lucide-react"
import type { Product,   } from "@/types/product"
import { toast } from "sonner"
import { ProductVariant } from "@/types/productVariant"

interface FrequentlyBoughtTogetherProps {
  mainProduct: Product
  mainVariant: ProductVariant
  fbt: Record<string, string[]>
}

export function FrequentlyBoughtTogether({ mainProduct, mainVariant, fbt }: FrequentlyBoughtTogetherProps) {
  const { products, shopSettings } = useMainStore()
  const { addItem } = useCartStore()
  const [fbtProducts, setFbtProducts] = useState<{ product: Product; variant: ProductVariant; selected: boolean }[]>([])

  const defaultCurrency = shopSettings[0]?.defaultCurrency

  useEffect(() => {
    const fbtItems = Object.entries(fbt)
      .map(([productId, variantIds]) => {
        const product = products.find((p) => p.id === productId)
        if (!product) return null

        const variant = product.variants.find((v) => variantIds.includes(v.id))
        if (!variant) return null

        return { product, variant, selected: true }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)

    setFbtProducts(fbtItems)
  }, [fbt, products])

  const handleCheckboxChange = (index: number) => {
    setFbtProducts((prev) => prev.map((item, i) => (i === index ? { ...item, selected: !item.selected } : item)))
  }

  const handleAddToCart = () => {
    addItem(mainProduct, mainVariant, 1)
    fbtProducts.forEach((item) => {
      if (item.selected) {
        addItem(item.product, item.variant, 1)
      }
    })
    toast.success("Combo añadido al carrito", {
      description: "Los productos seleccionados han sido añadidos a tu carrito.",
    })
  }

  const getPrice = (variant: ProductVariant): number => {
    const price = variant.prices.find((p) => p.currencyId === defaultCurrency?.id)?.price
    return Number(price || 0)
  }

  const mainProductPrice = getPrice(mainVariant)

  const selectedTotal = fbtProducts.reduce((sum, item) => {
    if (!item.selected) return sum
    const itemPrice = getPrice(item.variant)
    return sum + itemPrice
  }, mainProductPrice)

  if (fbtProducts.length === 0) return null

  return (
    <div className="mt-8 border border-gray-200 rounded-lg p-4 sm:p-6">
      <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">¡Haz tu compra aun mejor!</h2>
      <Button onClick={handleAddToCart} className="   " variant="outline">
        Añadir combo al carrito
      </Button>
      </div>
      

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={mainProduct.imageUrls[0] || "/placeholder.svg"}
            alt={mainProduct.title}
            fill
            className="object-contain p-2"
          />
        </div>
        {fbtProducts.map((item, index) => (
          <div key={item.product.id} className="flex items-center">
            <Plus className="mr-2 text-gray-400" />
            <div
              className={`relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden ${item.selected ? "ring-2 ring-primary" : ""}`}
            >
              <Image
                src={item.product.imageUrls[0] || "/placeholder.svg"}
                alt={item.product.title}
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{mainProduct.title}</span>
          <span className="font-semibold text-primary">
            {defaultCurrency?.symbol}
            {mainProductPrice.toFixed(2)}
          </span>
        </div>
        {fbtProducts.map((item, index) => (
          <div key={item.product.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={item.selected}
                onCheckedChange={() => handleCheckboxChange(index)}
                id={`fbt-${item.product.id}`}
              />
              <label htmlFor={`fbt-${item.product.id}`} className="cursor-pointer">
                {item.product.title} - {item.variant.title}
              </label>
            </div>
            <span className="font-semibold text-primary">
              {defaultCurrency?.symbol}
              {getPrice(item.variant).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between  ">
        <span className="text-lg font-normal text-gray-900">Precio total:</span>
        <span className="text-xl font-semibold text-primary">
          {defaultCurrency?.symbol}
          {selectedTotal.toFixed(2)}
        </span>
      </div>

      
    </div>
  )
}

