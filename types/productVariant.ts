import { Timestamps } from './common';
import { Product } from './product';
import { VariantPrice } from './variantPrice';

// Define the structure of a product variant
export interface ProductVariant extends Timestamps {
  id: string;
  // product: Product;
  productId: string;
  title: string;
  sku: string;
  attributes: Record<string, string>;
  isActive?: boolean
  imageUrl: string;
  prices: VariantPrice[];
 
  inventoryQuantity: number;
  weightValue: number;
  position: number;
}
 