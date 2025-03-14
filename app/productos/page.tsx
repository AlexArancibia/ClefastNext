"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import ProductList from "./_components/ProductList"
import ProductListSkeleton from "./_components/ProductListSkeleton"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Sección de encabezado con efecto de fade-in */}
      <motion.div
        className="container-section py-16 md:py-16 bg-[url('/fondoproduct.jpg')] bg-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="content-section text-center">
          <motion.h2 
            className="text-white mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Nuestros Productos
          </motion.h2>
          <motion.p 
            className="text-white/90 text-lg"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Descubre nuestra línea completa de productos de limpieza industrial
          </motion.p>
        </div>
      </motion.div>

      {/* Sección de productos con efecto de fade-in */}
      <motion.div
        className="container-section py-8 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="content-section">
          <Suspense fallback={<ProductListSkeleton />}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ProductList />
            </motion.div>
          </Suspense>
        </div>
      </motion.div>
    </main>
  )
}
