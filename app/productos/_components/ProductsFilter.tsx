"use client"

import type React from "react"
import { useState, useMemo, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import type { Category } from "@/types/category"
import type { Product } from "@/types/product"
import { useMainStore } from "@/stores/mainStore"

interface ProductFiltersProps {
  onFilterChange: (filters: Filters) => void
}

interface Filters {
  searchTerm: string
  categories: string[]
  variants: Record<string, string[]>
  priceRange: [number, number]
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const router = useRouter()
  const { categories, products, shopSettings } = useMainStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [filtersChanged, setFiltersChanged] = useState(false)

  const defaultCurrency = shopSettings[0]?.defaultCurrency

  const { minPrice, maxPrice } = useMemo(() => {
    let min = Number.POSITIVE_INFINITY
    let max = Number.NEGATIVE_INFINITY
    products.forEach((product: Product) => {
      product.variants.forEach((variant) => {
        const price = variant.prices.find((p) => p.currencyId === defaultCurrency?.id)?.price || 0
        min = Math.min(min, price)
        max = Math.max(max, price)
      })
    })
    return { minPrice: Math.floor(min), maxPrice: Math.ceil(max) }
  }, [products, defaultCurrency])

  useEffect(() => {
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const variantAttributes = useMemo(() => {
    const attributes: Record<string, Set<string>> = {}
    products.forEach((product: Product) => {
      product.variants.forEach((variant) => {
        Object.entries(variant.attributes).forEach(([key, value]) => {
          if (key !== "type" && typeof value === "string") {
            if (!attributes[key]) {
              attributes[key] = new Set()
            }
            attributes[key].add(value)
          }
        })
      })
    })
    return Object.fromEntries(Object.entries(attributes).map(([key, value]) => [key, Array.from(value).sort()]))
  }, [products])

  const applyFilters = useCallback(() => {
    if (filtersChanged) {
      const filters: Filters = {
        searchTerm,
        categories: selectedCategories,
        variants: selectedVariants,
        priceRange,
      }
      onFilterChange(filters)
      setFiltersChanged(false)
    }
  }, [searchTerm, selectedCategories, selectedVariants, priceRange, onFilterChange, filtersChanged])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
    setFiltersChanged(true)
  }

  const handleVariantChange = (attribute: string, value: string) => {
    setSelectedVariants((prev) => {
      const currentValues = prev[attribute] || []
      return {
        ...prev,
        [attribute]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      }
    })
    setFiltersChanged(true)
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
    setFiltersChanged(true)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setFiltersChanged(true)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedVariants({})
    setPriceRange([minPrice, maxPrice])
    setFiltersChanged(true)
    router.refresh()
  }

  return (
    <div className="w-72 bg-white space-y-6 ">

      {/* Search */}
      <Input
        type="text"
        placeholder="Buscar productos"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full"
      />

      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-4">Categorías</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {categories.map((category: Category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={category.id} className="text-sm text-gray-700 cursor-pointer">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium mb-4">Precio</h3>
        <div className="space-y-4">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={1}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{defaultCurrency?.symbol}{priceRange[0]}</span>
            <span>{defaultCurrency?.symbol}{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Variant Attributes */}
      {Object.entries(variantAttributes).map(([attribute, values]) => (
        <div key={attribute}>
          <h3 className="text-lg font-medium mb-4  ">{attribute}</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            {values.map((value) => (
              <div key={`${attribute}-${value}`} className="flex items-center space-x-2">
                <Checkbox
                  id={`${attribute}-${value}`}
                  checked={(selectedVariants[attribute] || []).includes(value)}
                  onCheckedChange={() => handleVariantChange(attribute, value)}
                />
                <label htmlFor={`${attribute}-${value}`} className="text-sm text-gray-700 cursor-pointer">
                  {value}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={resetFilters} className="w-full bg-secondary text-white hover:bg-blue-700 transition">
        Resetear Filtros
      </Button>
    </div>
  )
}
