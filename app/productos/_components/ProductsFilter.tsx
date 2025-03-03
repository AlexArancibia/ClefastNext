"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { mockCategories, mockProducts } from "@/lib/mock-data"

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void
}

type ExpandedSections = {
  [key: string]: boolean
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    categories: true,
    price: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const priceRanges = [
    { label: "Menos de S/50", value: "0-50" },
    { label: "S/50 - S/100", value: "50-100" },
    { label: "S/100 - S/200", value: "100-200" },
    { label: "Más de S/200", value: "200+" },
  ]

  const variantAttributes = useMemo(() => {
    const attributes: Record<string, Set<string>> = {}
    mockProducts.forEach((product) => {
      product.variants.forEach((variant) => {
        Object.entries(variant.attributes).forEach(([key, value]) => {
          if (!attributes[key]) {
            attributes[key] = new Set()
          }
          attributes[key].add(value)
        })
      })
    })
    return Object.fromEntries(Object.entries(attributes).map(([key, value]) => [key, Array.from(value).sort()]))
  }, [])

  return (
    <div className="w-80 bg-white p-6 rounded-lg border border-border space-y-6 sticky">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Filtros</h2>

      <FilterSection
        title="Categorías"
        isExpanded={expandedSections["categories"]}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-3">
          {mockCategories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id={category.id} className="rounded-sm" />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {category.name} <span className="text-gray-400">({category.products.length})</span>
                </label>
              </div>
              {category.children && category.children.length > 0 && (
                <div className="ml-6 space-y-1">
                  {category.children.map((subCategory) => (
                    <div key={subCategory.id} className="flex items-center space-x-2">
                      <Checkbox id={subCategory.id} className="rounded-sm" />
                      <label
                        htmlFor={subCategory.id}
                        className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        {subCategory.name} <span className="text-gray-400">({subCategory.products.length})</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Precio" isExpanded={expandedSections["price"]} onToggle={() => toggleSection("price")}>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <Checkbox id={range.value} className="rounded-sm" />
              <label htmlFor={range.value} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {Object.entries(variantAttributes).map(([attribute, values]) => (
        <FilterSection
          key={attribute}
          title={attribute.charAt(0).toUpperCase() + attribute.slice(1)}
          isExpanded={expandedSections[attribute] || false}
          onToggle={() => toggleSection(attribute)}
        >
          <div className="grid grid-cols-2 gap-2">
            {values.map((value) => (
              <div key={`${attribute}-${value}`} className="flex items-center space-x-2">
                <Checkbox id={`${attribute}-${value}`} className="rounded-sm" />
                <label
                  htmlFor={`${attribute}-${value}`}
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {value}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      ))}

      <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white" onClick={() => onFilterChange({})}>
        Aplicar Filtros
      </Button>
    </div>
  )
}

interface FilterSectionProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2 text-left focus:outline-none group"
      >
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-2 space-y-2 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

