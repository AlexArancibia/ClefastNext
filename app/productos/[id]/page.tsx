import { Suspense } from "react"
import ProductSkeleton from "../_components/ProductSkeleton"
import ProductDetails from "../_components/ProductDetails"
 

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails id={params.id} />
    </Suspense>
  )
}

