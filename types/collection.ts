import type { Timestamps } from "./common"

export interface Collection extends Timestamps {
  id: string
  title: string
  description?: string
  slug: string
  imageUrl?: string
  isFeatured: boolean
  metaTitle?: string
  metaDescription?: string
}

