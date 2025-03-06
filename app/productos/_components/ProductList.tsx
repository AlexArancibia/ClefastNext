"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 
import type { Product } from "@/types/product"
import type { Category } from "@/types/category"
import { useMainStore } from "@/stores/mainStore"
import { ProductFilters } from "./ProductsFilter"
import { FilterDrawer } from "./FilterDrawer"
import { ProductCard } from "@/components/ProductCard"
import { Pagination } from "./Pagination"

const PRODUCTS_PER_PAGE = 9
interface ProductFiltersProps {
  onFilterChange: (filters: Filters) => void
  onResetFilters: () => void
}
interface Filters {
  searchTerm: string
  categories: string[]
  variants: Record<string, string[]>
  priceRange: [number, number]
}

export default function ProductList() {
  const { products, shopSettings } = useMainStore()
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    categories: [],
    variants: {},
    priceRange: [0, Number.POSITIVE_INFINITY],
  })
  const [currentPage, setCurrentPage] = useState(1)

  const defaultCurrency = shopSettings[0]?.defaultCurrency

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      // Filter by search term
      if (filters.searchTerm && !product.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false
      }

      // Filter by category
      if (
        filters.categories.length > 0 &&
        !product.categories.some((cat: Category) => filters.categories.includes(cat.id))
      ) {
        return false
      }

      // Filter by variants
      const variantMatches = Object.entries(filters.variants).every(([attribute, values]) => {
        return product.variants.some(
          (variant) =>
            values.length === 0 ||
            values.includes(variant.attributes[attribute as keyof typeof variant.attributes] as string),
        )
      })
      if (!variantMatches) {
        return false
      }

      // Filter by price
      const productPrice = product.variants[0].prices.find((price) => price.currencyId === defaultCurrency?.id)?.price
      if (productPrice && (productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1])) {
        return false
      }

      return true
    })
  }, [products, filters, defaultCurrency])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return (
            (a.variants[0].prices.find((price) => price.currencyId === defaultCurrency?.id)?.price || 0) -
            (b.variants[0].prices.find((price) => price.currencyId === defaultCurrency?.id)?.price || 0)
          )
        case "price-desc":
          return (
            (b.variants[0].prices.find((price) => price.currencyId === defaultCurrency?.id)?.price || 0) -
            (a.variants[0].prices.find((price) => price.currencyId === defaultCurrency?.id)?.price || 0)
          )
        case "name":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
  }, [filteredProducts, sortBy, defaultCurrency])

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  }, [sortedProducts, currentPage])

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      {/* Sidebar con filtros (visible solo en desktop) */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <ProductFilters onFilterChange={handleFilterChange} />
      </aside>

      {/* Productos */}
      <div className="flex-1">
        {/* Controles superiores */}
        <div className="flex justify-between items-center mb-6">
          <FilterDrawer onFilterChange={handleFilterChange} />
          <p className="text-sm text-muted-foreground hidden sm:block">
            Mostrando {paginatedProducts.length} de {sortedProducts.length} productos
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="name">Nombre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <motion.div key={product.id} layout>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Paginación */}
        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}

