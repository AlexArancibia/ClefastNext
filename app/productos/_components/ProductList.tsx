"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 
import { mockProducts } from "@/lib/mock-data"
import { ProductFilters } from "./ProductsFilter"
import { FilterDrawer } from "./FilterDrawer"
import { ProductCard } from "@/components/ProductCard"
import { Pagination } from "./Pagination"

const PRODUCTS_PER_PAGE = 9

export default function ProductList() {
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(() => {
    // Aquí implementarías la lógica de filtrado real
    return mockProducts
  }, [])

  const sortedProducts = useMemo(() => {
    // Aquí implementarías la lógica de ordenamiento real
    return [...filteredProducts]
  }, [filteredProducts])

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  }, [sortedProducts, currentPage])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar con filtros (visible solo en desktop) */}
      <aside className="hidden lg:block w-80 flex-shrink-0">
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedProducts.map((product) => (
            <motion.div key={product.id} variants={containerVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Paginación */}
        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}

