import { Suspense } from "react"
import ProductList from "./_components/ProductList"
import ProductListSkeleton from "./_components/ProductListSkeleton"
 

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-section py-8">
        <div className="content-section">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nuestros Productos</h1>
            <p className="text-muted-foreground">Descubre nuestra línea completa de productos de limpieza industrial</p>
          </div>

          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

