import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProductActionsUnion, ProductActionTypes } from '../actions/product.actions';
import { Product } from '../models/product.model';

export interface ProductState extends EntityState<Product> {
  selectedProductId: number | null;
}

export function sortByProduct(ob1: Product, ob2: Product): number {
  return ob1.name.localeCompare(ob2.name);
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
   selectId: (product: Product) => product.id,
   sortComparer: sortByProduct,
 });

export const initialState: ProductState = adapter.getInitialState({
  selectedProductId: null
});

export function reducer(state = initialState, action: ProductActionsUnion): ProductState {
  
  switch (action.type) {
    case ProductActionTypes.LoadComplete: {
      return adapter.addMany(action.payload, state);
    }

    case ProductActionTypes.Select: {
      return {
        ...state,
        selectedProductId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getProductState = ( (state: ProductState) => state);
export const getCurrentProductId = (state: ProductState) => state.selectedProductId;

