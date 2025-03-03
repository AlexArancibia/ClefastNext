import type { Product } from "./product"
import type { Category } from "./category"
import type { Collection } from "./collection"
import type { Order } from "./order"
import { DiscountType, Timestamps } from "./common"

 

export interface Coupon  extends Timestamps{
  id: string
  code: string
  description?: string
  type: DiscountType
  value: number
  minPurchase?: number
  maxUses?: number
  usedCount: number
  startDate: Date
  endDate: Date
  isActive: boolean
  applicableProducts?: Product[]
  applicableCategories?: Category[]
  applicableCollections?: Collection[]
  orders?: Order[]
 
}

 