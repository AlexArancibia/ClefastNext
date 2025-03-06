"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, ChevronRightIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMainStore } from "@/stores/mainStore"
import { useCartStore } from "@/stores/cartStore"
import type { Product } from "@/types/product"
import type { ProductVariant } from "@/types/productVariant"
import { ProductSidebar } from "./ProductSidebar"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { FrequentlyBoughtTogether } from "./frequentlyBoughtTogether"
import { ProductCard } from "@/components/ProductCard"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductDetailsProps {
  slug: string
}

export default function ProductDetails({ slug }: ProductDetailsProps) {
  const { products, shopSettings } = useMainStore()
  const { addItem } = useCartStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // Carrusel para productos relacionados
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    slidesToScroll: 1,
  })

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      const foundProduct = products.find((p) => p.slug === slug)
      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedVariant(foundProduct.variants[0])
      }
      setIsLoading(false)
    }
    loadProduct()
  }, [slug, products])

  const variantOptions = useMemo(() => {
    if (!product) return {}
    const options: Record<string, Set<string>> = {}
    product.variants.forEach((variant) => {
      Object.entries(variant.attributes).forEach(([key, value]) => {
        if (key !== "type" && !options[key]) options[key] = new Set()
        if (key !== "type") options[key].add(value as string)
      })
    })
    return Object.fromEntries(Object.entries(options).map(([key, value]) => [key, Array.from(value)]))
  }, [product])

  const allImages = useMemo(() => {
    if (!product) return []
    const images = [...product.imageUrls]
    product.variants.forEach((variant) => {
      if (variant.imageUrl && !images.includes(variant.imageUrl)) {
        images.push(variant.imageUrl)
      }
    })
    return images
  }, [product])

  const getVariantForImage = (imageUrl: string): ProductVariant | null => {
    if (!product) return null
    return product.variants.find((variant) => variant.imageUrl === imageUrl) || null
  }

  // Productos relacionados: productos que comparten categorías con el producto actual
  const relatedProducts = useMemo(() => {
    if (!product) return []

    const productCategoryIds = product.categories.map((cat) => cat.id)

    return products
      .filter((p) => p.id !== product.id && p.categories.some((cat) => productCategoryIds.includes(cat.id)))
      .slice(0, 8)
  }, [product, products])

  const optionKeys = Object.keys(variantOptions)

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (!product || !selectedVariant) {
    return null
  }

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))
  const increaseQuantity = () => {
    const maxQuantity = product.allowBackorder
      ? Math.max(selectedVariant.inventoryQuantity, 5)
      : selectedVariant.inventoryQuantity
    setQuantity((prev) => Math.min(maxQuantity, prev + 1))
  }

  const mainPrice = selectedVariant.prices[0]
  const price = mainPrice.price

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - left) / width) * 100
    const y = ((event.clientY - top) / height) * 100
    setMousePosition({ x, y })
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
    const variant = getVariantForImage(allImages[index])
    if (variant) {
      setSelectedVariant(variant)
    }
  }

  const isVariantAvailable = (variant: ProductVariant) => {
    return variant.inventoryQuantity > 0 || product.allowBackorder
  }

  const handleVariantChange = (optionKey: string, optionValue: string) => {
    const newVariant = product.variants.find(
      (variant) =>
        variant.attributes[optionKey] === optionValue &&
        Object.entries(selectedVariant.attributes).every(
          ([key, value]) => key === optionKey || variant.attributes[key] === value,
        ),
    )
    if (newVariant && isVariantAvailable(newVariant)) {
      setSelectedVariant(newVariant)
      const variantImageIndex = allImages.findIndex((img) => img === newVariant.imageUrl)
      if (variantImageIndex !== -1) {
        setCurrentImageIndex(variantImageIndex)
      }
      setQuantity(1) // Reset quantity when changing variant
    }
  }

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addItem(product, selectedVariant, quantity)
      toast.success("Producto añadido al carrito", {
        description: `${quantity} x ${product.title} (${Object.values(selectedVariant.attributes).join(", ")})`,
      })
    }
  }

  const isOptionDisabled = (optionKey: string, optionValue: string) => {
    const variant = product.variants.find(
      (v) =>
        v.attributes[optionKey] === optionValue &&
        Object.entries(selectedVariant.attributes).every(
          ([key, value]) => key === optionKey || v.attributes[key] === value,
        ),
    )
    return variant ? !isVariantAvailable(variant) : true
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Header Section */}
      <div className="bg-[url('/fondoproduct.jpg')] bg-cover py-8">
        <div className="container mx-auto px-4">
          <div className="py-6">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-2"
            >
              <Link href="/" className="text-white/90 hover:text-primary">
                Inicio
              </Link>
              <ChevronRightIcon className="w-4 h-4 text-white/70" />
              <Link href="/productos" className="text-white/90 hover:text-primary">
                Productos
              </Link>
              <ChevronRightIcon className="w-4 h-4 text-white/70" />
              <span className="text-white/90 font-medium">{product.title}</span>
            </motion.div>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white"
            >
              {product.title}
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8 lg:gap-12">
          {/* Product Content */}
          <div className="space-y-8">
            {/* Product Images and Purchase Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Gallery */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-4"
              >
                {/* Imagen principal */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-zoom-in"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <Image
                      src={allImages[currentImageIndex] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className={`object-contain p-4 transition-transform duration-200 ease-out ${isZoomed ? "scale-150" : "scale-100"}`}
                      style={{
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      }}
                    />
                    {getVariantForImage(allImages[currentImageIndex]) && (
                      <Badge className="absolute top-2 right-2 bg-white" variant="outline">
                        {Object.values(getVariantForImage(allImages[currentImageIndex])!.attributes).join(" - ")}
                      </Badge>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Galería de miniaturas */}
                <div className="flex gap-2 overflow-x-auto pb-2 p-2 scrollbar-hide">
                  {allImages.map((url, index) => (
                    <motion.button
                      key={`${url}-${index}`}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all duration-200  ${
                        index === currentImageIndex
                          ? "ring-2 ring-primary scale-105 z-10"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        className="object-contain p-2"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Purchase Options */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-6"
              >
                <label className="text-lg font-medium mb-1.5 block">Descripción</label>
                <p
                  className="text-secondary/90 leading-relaxed [&_p]:mb-4 [&_a]:text-blue-600 [&_a]:underline 
                            [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 
                            [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold 
                            [&_h3]:text-lg [&_h3]:font-medium 
                            [&_blockquote]:border-l-4 [&_blockquote]:border-gray-400 [&_blockquote]:pl-4 [&_blockquote]:italic 
                            [&_table]:w-full [&_table]:border [&_table]:border-gray-300 [&_table]:border-collapse 
                            [&_th]:bg-gray-100 [&_th]:border [&_th]:border-gray-300 [&_th]:text-left [&_th]:px-3 [&_th]:pt-2 [&_th]:font-medium 
                            [&_td]:border [&_td]:border-gray-300 [&_td]:px-3 [&_td]:pt-2 [&_td]:text-gray-700 [&_td]:whitespace-nowrap"
                  dangerouslySetInnerHTML={{ __html: product.description ?? "" }}
                ></p>

                {optionKeys.map((optionKey, index) => (
                  <div key={optionKey} className="space-y-2">
                    <label className="text-sm font-medium">{optionKey}</label>
                    <div className="flex flex-wrap gap-2">
                      {variantOptions[optionKey].map((optionValue) => {
                        const isDisabled = isOptionDisabled(optionKey, optionValue)
                        return (
                          <Button
                            key={optionValue}
                            variant={selectedVariant.attributes[optionKey] === optionValue ? "default" : "outline"}
                            onClick={() => handleVariantChange(optionKey, optionValue)}
                            disabled={isDisabled}
                            className={isDisabled ? "opacity-50" : ""}
                          >
                            {optionValue}
                            {isDisabled && <X className="w-3 h-3 ml-1" />}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                ))}

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
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {mainPrice.currency.symbol}
                      {Number(price).toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="w-[200px]"
                    onClick={handleAddToCart}
                    disabled={!isVariantAvailable(selectedVariant)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {isVariantAvailable(selectedVariant) ? "Agregar al carrito" : "Sin stock"}
                  </Button>
                </div>

                {selectedVariant.inventoryQuantity === 0 && product.allowBackorder ? (
                  <p className="text-sm text-yellow-500">Producto en backorder (máximo 5 unidades)</p>
                ) : selectedVariant.inventoryQuantity === 0 ? (
                  <p className="text-sm text-red-500 flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    Producto sin stock
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Stock disponible: {selectedVariant.inventoryQuantity} unidades
                  </p>
                )}
              </motion.div>
            </div>

            {/* Añadir el componente FrequentlyBoughtTogether aquí */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <FrequentlyBoughtTogether mainProduct={product} mainVariant={selectedVariant} fbt={product.fbt} />
            </motion.div>

            {/* Carrusel de productos relacionados */}
            {relatedProducts.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-12"
              >
                <h2 className="text-xl font-normal mb-6">Productos relacionados</h2>
                <div className="relative">
                  <div className="overflow-hidden py-4" ref={emblaRef}>
                    <div className="flex">
                      {relatedProducts.map((relatedProduct) => (
                        <div
                          key={relatedProduct.id}
                          className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-2"
                        >
                          <ProductCard product={relatedProduct} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botones de navegación */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => emblaApi?.scrollPrev()}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow-md z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => emblaApi?.scrollNext()}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow-md z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <ProductSidebar product={product} />
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}

function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-200 h-40"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8 lg:gap-12">
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="w-16 h-16 rounded-md" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    </div>
  )
}

