"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const mainVariant = product.variants[0]
  const mainPrice = mainVariant.prices[0]
  const price = mainPrice.price
  const originalPrice = mainPrice.originalPrice

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined

  const isNew = new Date().getTime() - new Date(product.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000

  const image = product.imageUrls[0] || "/placeholder.svg"

  return (
    <motion.div
      className="group relative bg-white rounded-2xl p-4 border   duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/productos/${product.id}`}>
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
          {isNew && (
            <Badge variant="secondary" className="bg-white hover:bg-accent text-secondary">
              NEW
            </Badge>
          )}
          {discount && discount > 0 && <Badge className="bg-green-600 hover:bg-green-600/90">-{discount}%</Badge>}
        </div>

        {/* Image */}
        <div className="relative aspect-square mb-4 bg-gray-50 rounded-xl overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-sm text-secondary">{product.title}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-700">
              {mainPrice.currency.symbol} {price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                {mainPrice.currency.symbol} {originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Shows on hover */}
        <div className="absolute inset-x-4 bottom-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full gap-2 bg-gradient-to-t from-primary to-primary/60 h-7 text-xs">
            <ShoppingCart className="w-4 h-4" />
            Añadir al Carrito
          </Button>
        </div>
      </Link>
    </motion.div>
  )
}

