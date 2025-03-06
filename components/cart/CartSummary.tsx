import { useCartStore } from "@/stores/cartStore"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
 
import Link from "next/link"
import { Cart } from "./Cart"

export function CartSummary() {
  const items = useCartStore((state) => state.items)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tu carrito</SheetTitle>
          <SheetDescription>Resumen de los productos en tu carrito de compras</SheetDescription>
        </SheetHeader>
        <Cart />
        <div className="mt-4">
          <Link href="/cart" passHref>
            <Button className="w-full">Ver carrito completo</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

