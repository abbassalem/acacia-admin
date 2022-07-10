import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../shared/reducers';
import { Category } from '../models/category.model';
import * as fromCategories from './categories.reducer';

export interface ShopState {
  categories: fromCategories.CategoryState;
}

export interface State extends fromRoot.State {
  shop: ShopState;
}

export const reducers: ActionReducerMap<ShopState> = {
  categories: fromCategories.reducer,
};

/* SELECTORS */

export const getShopState = createFeatureSelector<ShopState>('shop');
export const getCategoryState = createSelector(getShopState, (state: ShopState) => state.categories);

/* categories and products*/
export const getSelectedCategoryId = createSelector(getCategoryState,  (state) => state.selectedCategoryId);
export const getSelectedProductId = createSelector(getCategoryState,  (state) => state.selectedProductId);
export const isLoaded = createSelector(getCategoryState,  (state) => state.isLoaded);

export const {
  selectIds: getCategoryIds,
  selectEntities: getCategoryEntities,
  selectAll: getAllCategories,
  selectTotal: categoryCount
} = fromCategories.adapter.getSelectors(getCategoryState);

export const getProductsForSelectedCategory = createSelector(
  getSelectedCategoryId,
  getCategoryEntities,
  (id, entities) => {
        return entities[id].products;
  }
);

export const getSelectedProduct = createSelector(
  getSelectedProductId,
  getSelectedCategoryId,
  getCategoryEntities,
  (prodId, catId, cats) => {
        return cats[catId].products.filter( product => product.id === prodId)[0];
  }
);


