import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Product,   } from "@/types/product"
import { ProductVariant } from "@/types/productVariant"

interface CartItem {
  product: Product
  variant: ProductVariant
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant, quantity) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.variant.id === variant.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.variant.id === variant.id ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          } else {
            return { items: [...state.items, { product, variant, quantity }] }
          }
        })
      },
      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variant.id !== variantId),
        }))
      },
      updateQuantity: (variantId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => (item.variant.id === variantId ? { ...item, quantity } : item)),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.variant.prices[0].price
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

