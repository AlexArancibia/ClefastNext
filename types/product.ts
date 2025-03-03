import { ProductStatus, Timestamps } from './common';
import { Category } from './category';
import { Collection } from './collection';

import {  ProductVariant } from './productVariant';
import { Coupon } from './coupon';

export interface Product extends Timestamps {
  id: string
  title: string
  description?: string
  slug: string
  vendor?: string
  fbt: Record<string, any>
  allowBackorder: boolean
  status: ProductStatus
  categories: Category[]
  variants: ProductVariant[]
  imageUrls: string[]
  collections: Collection[]
  metaTitle?: string
  metaDescription?: string
  coupons: Coupon[],
  releaseDate?: Date
}

export interface ProductOption {
  title: string;
  values: string[];
}