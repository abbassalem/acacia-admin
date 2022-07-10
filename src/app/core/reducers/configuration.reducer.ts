import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ConfigActionTypes,
  ConfigActionsUnion,
} from '../actions/configuration.actions';
import { Image } from '../models/config.model';

export interface ConfigState {
  deliveryTimes: string[];
  images: Array<Image>;
}

const initialConfigState: ConfigState = {
  deliveryTimes: [],
  images: []
}; 

export const selectConfigState = createFeatureSelector<ConfigState>('config');

export function reducer(
  ConfigState: ConfigState = initialConfigState, action: ConfigActionsUnion): ConfigState {
  switch (action.type) {
    case ConfigActionTypes.LoadDeliveryTimesComplete:
      return {
        deliveryTimes: action.payload,
        images: []
      };
    case ConfigActionTypes.LoadImagesComplete:
      return {
        images: action.payload,
        deliveryTimes: []
      };
    default:
      return ConfigState;
  }
}

export const getImages = createSelector(selectConfigState, (state: ConfigState) => state.images);
export const getDeliveryTimes = createSelector(selectConfigState, (state: ConfigState) => state.deliveryTimes);