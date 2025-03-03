import { Timestamps } from "./common"
import { Currency } from "./currency"
import type { Order } from "./order"

export interface ShippingMethod  extends Timestamps {
  id: string
  name: string
  description?: string
  prices: ShippingMethodPrice[]
  estimatedDeliveryTime?: string
  isActive: boolean
  orders?: Order[]
}
 



export interface ShippingMethodPrice extends Timestamps {
  id: string
  shippingMethod: ShippingMethod
  shippingMethodId: string
  currency: Currency
  currencyId: string
  price: number
}

 