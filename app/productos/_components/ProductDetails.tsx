"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, Minus, Plus, ShoppingCart, Heart, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
 
import { mockProducts } from "@/lib/mock-data"
import type { Product,   } from "@/types/product"
import { ProductVariant } from "@/types/productVariant"
import { ProductSidebar } from "./ProductSidebar"

export default function ProductDetails({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === id)
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedVariant(foundProduct.variants[0])
    }
  }, [id])

  if (!product || !selectedVariant) {
    return null // This will never be rendered because of the Suspense boundary
  }

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))
  const increaseQuantity = () => setQuantity((prev) => Math.min(selectedVariant.inventoryQuantity, prev + 1))

  const images = [...product.imageUrls, ...(selectedVariant.imageUrl ? [selectedVariant.imageUrl] : [])]

  const mainPrice = selectedVariant.prices[0]
  const price = mainPrice.price
  const originalPrice = mainPrice.originalPrice

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link href="/" className="hover:text-primary">
                Inicio
              </Link>
              <ChevronRightIcon className="w-4 h-4" />
              <Link href="/productos" className="hover:text-primary">
                Productos
              </Link>
              <ChevronRightIcon className="w-4 h-4" />
              <span className="text-primary font-medium">{product.title}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8 lg:gap-12">
          {/* Product Content */}
          <div className="space-y-8">
            {/* Product Info Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">(128 reseñas)</span>
                </div>
                {product.status === "ACTIVE" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Activo
                  </Badge>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  {mainPrice.currency.symbol}
                  {price.toFixed(2)}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-lg text-muted-foreground line-through">
                    {mainPrice.currency.symbol}
                    {originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Product Images and Purchase Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((url, index) => (
                    <button
                    key={`${url}-${index}`}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                        index === currentImageIndex ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase Options */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Variante</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <Button
                        key={variant.id}
                        variant={selectedVariant.id === variant.id ? "default" : "outline"}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        {variant.title}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Cantidad</label>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="icon" onClick={decreaseQuantity}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={increaseQuantity}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar al carrito
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Stock disponible: {selectedVariant.inventoryQuantity} unidades
                </p>
              </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="features">Características</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedVariant.attributes || {}).map(([key, value]) => (
                    <li key={key} className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-primary rounded-full"></span>
                      <span className="capitalize font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <p className="text-muted-foreground">Reseñas de clientes próximamente.</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <ProductSidebar product={product} />
        </div>
      </div>
    </main>
  )
}

