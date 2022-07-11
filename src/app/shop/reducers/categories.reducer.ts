import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { CategoryActionTypes, CategoryActionsUnion } from '../actions/category.actions';
import { Category } from '../models/category.model';

export interface CategoryState extends EntityState<Category> {
  isLoaded: boolean | null;
  selectedCategoryId: string | null;
  selectedProductId: number | null;
}

export function sortByCategory(ob1: Category, ob2: Category): number {
  return ob1.name.localeCompare(ob2.name);
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
   selectId: (category: Category) => category.id,
   sortComparer: sortByCategory,
 });

export const initialState: CategoryState = adapter.getInitialState({
  isLoaded: false,
  selectedCategoryId: null,
  selectedProductId: null
});

export function reducer(state = initialState, action: CategoryActionsUnion ): CategoryState {
  switch (action.type) {
    
    case CategoryActionTypes.Load: {
      return adapter.getInitialState(state);
    }

    case CategoryActionTypes.LoadComplete: {
      state = Object.assign({ ...state, isLoaded:true});
      return adapter.addMany(action.payload, state);
    }
    
    case CategoryActionTypes.CreateCategory: {
      return state;
    }

    case CategoryActionTypes.UpdateCategoryComplete: {
      return adapter.updateOne({id: action.payload.id, changes: action.payload}, state);
    }

    case CategoryActionTypes.CreateCategoryError: {
      return state;
    }

    case CategoryActionTypes.UpdateCategory: {
      return state;
    }

    case CategoryActionTypes.RemoveCategory: {
      return adapter.removeOne(action.payload, state);
    }


    case CategoryActionTypes.Select: {
      return {...state, selectedCategoryId: action.payload};
    }

    case CategoryActionTypes.SelectProduct: {
      return {...state, selectedProductId: action.payload};
    }
    default: {
      return state;
    }
  }
}


