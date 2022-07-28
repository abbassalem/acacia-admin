import { AuthActionsUnion, AuthActionTypes } from './../actions/auth.actions';
import { User } from '../models/user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userInfo } from 'os';

export interface State {
  loggedIn: boolean;
  user: User ;
  orderUser: User;
  pending: boolean;
  errors: any;
  fetchedUsers: Array<User>
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  orderUser: null,
  pending: false,
  errors: '',
  fetchedUsers: new Array<User>()
}

export const selectAuthState = createFeatureSelector<State>('auth');

export function reducer(state = initialState, action: AuthActionsUnion): State {
  
  switch (action.type) {

    case AuthActionTypes.Login: {
      return {
        ...state,
        pending: true
      };
    }
    case AuthActionTypes.LoginComplete: {
      return {
        ...state,
        loggedIn: true,
        pending: false,
        user: action.payload,
      };
    }

    case AuthActionTypes.LoginError: {
      return {
        ...state,
        pending: false
      };
    }

    case AuthActionTypes.LoadOrderUser: {
      return {
        ...state
      };
    }

    case AuthActionTypes.LoadOrderUserComplete: {
      return {
        ...state,
        orderUser: action.payload
      };
    }

    case AuthActionTypes.LoadOrderUserError: {
      return {
        ...state
      };
    }


    case AuthActionTypes.Logout: {
      return {
        ...state, 
        loggedIn: false,
        user: null
      };
    }

    case AuthActionTypes.FetchedUsers: {
      return state;
    }

    case AuthActionTypes.FetchedUsersComplete: {
      return { ... state, fetchedUsers: action.payload}
    }

    case AuthActionTypes.FetchedUsersError: {
      return state;
    }
    

    default: {
      return state;
    }
  }
}

export const getFetchedUsers = createSelector(selectAuthState, (state: State) => state.fetchedUsers);
export const getOrderdUser = createSelector(selectAuthState, (state: State) => state.orderUser);
export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getPending = (state: State) => state.pending;
export const getErrors = (state: State) => state.errors;


