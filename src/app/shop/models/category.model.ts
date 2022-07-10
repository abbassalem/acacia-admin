import { Product } from './product.model';

export interface Category {
  id?: string;
  name: string;
  description?: string;
  products: Array<Product>;
}



