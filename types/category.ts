 
import { Timestamps } from './common';
import { Product } from './product';

export interface Category extends Timestamps{
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?:string;
  parentId?: string;
  parent?: Category;
  children: Category[];
  products: Product[];
  metaTitle?: string
  metaDescription?: string 
}

