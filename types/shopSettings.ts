import type {  Timestamps } from "./common"
import { Currency } from "./currency"

export interface ShopSettings extends Timestamps {
  id: string
  name: string
  domain: string
  email?: string
  shopOwner?: string
  logo?: string
  description?: string
  address1?: string
  address2?: string
  city?: string
  province?: string
  provinceCode?: string
  country?: string
  countryCode?: string
  zip?: string
  phone?: string
  defaultCurrency: Currency
  defaultCurrencyId: string
  acceptedCurrencies: Currency[]
  multiCurrencyEnabled: boolean
  shippingZones?: string
  defaultShippingRate?: number
  freeShippingThreshold?: number
  taxesIncluded: boolean
  taxValue?: number
  timezone?: string
  weightUnit?: string
  primaryColor?: string
  secondaryColor?: string
  theme?: string
  facebookUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  tiktokUrl?: string
  youtubeUrl?: string
  googleAnalyticsId?: string
  facebookPixelId?: string
  supportEmail?: string
  supportPhone?: string
  liveChatEnabled: boolean
  status: string
  maintenanceMode: boolean
  multiLanguageEnabled: boolean
}

