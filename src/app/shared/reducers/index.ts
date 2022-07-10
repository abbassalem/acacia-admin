import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import * as fromConfig from '../../core/reducers/configuration.reducer';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import { RouterStateUrl } from '../../shared/utils';

export interface State {
  config: fromConfig.ConfigState;
  auth: fromAuth.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  config: fromConfig.reducer,
  router: fromRouter.routerReducer,
  auth: fromAuth.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];
//  !environment.production  ? [logger, storeFreeze]: [];

export const getConfigState = createFeatureSelector<fromConfig.ConfigState>('config');
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const isLoggedIn = createSelector(
  getAuthState,
  fromAuth.getLoggedIn
);

export const getUser = createSelector(
  getAuthState,
  fromAuth.getUser
);

export const getPending = createSelector(
  getAuthState,
  fromAuth.getPending
);

export const getErrors = createSelector(
  getAuthState,
  fromAuth.getErrors
);