import type { CurrencyPosition, Timestamps } from "./common"

export interface Currency extends Timestamps {
  id: string
  code: string
  name: string
  symbol: string
  decimalPlaces: number
  symbolPosition: CurrencyPosition
  isActive: boolean
}

