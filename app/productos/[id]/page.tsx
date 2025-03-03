import { Suspense } from "react"
import ProductSkeleton from "../_components/ProductSkeleton"
import ProductDetails from "../_components/ProductDetails"
 

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails id={params.id} />
    </Suspense>
  )
}

