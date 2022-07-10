import { Action } from '@ngrx/store';
import { Image } from '../models/config.model';

export enum ConfigActionTypes {
  LoadDeliveryTimes = '[Config] Load Delivery Times',
  LoadDeliveryTimesComplete = '[Config] Load Delivery Times Complete ',
  LoadDeliveryTimesError = '[Config] Load Delivery Times Error',

  LoadImages = '[Config] Load Images',
  LoadImagesComplete = '[Config] Load Images Complete ',
  LoadImagesError = '[Config] Load Delivery Times Error'
}

export class LoadDeliveryTimes implements Action {
  readonly type = ConfigActionTypes.LoadDeliveryTimes;
  constructor() {}
}

export class LoadDeliveryTimesComplete implements Action {
  readonly type = ConfigActionTypes.LoadDeliveryTimesComplete;
  constructor(public payload: string[]) {}
}

export class LoadDeliveryTimesError implements Action {
  readonly type = ConfigActionTypes.LoadDeliveryTimesError;
  constructor(public payload: any) {}
}

export class LoadImages implements Action {
  readonly type = ConfigActionTypes.LoadImages;
  constructor() {}
}

export class LoadImagesComplete implements Action {
  readonly type = ConfigActionTypes.LoadImagesComplete;
  constructor(public payload: Array<Image>) {}
}

export class LoadImagesError implements Action {
  readonly type = ConfigActionTypes.LoadImagesError;
  constructor(public payload: any) {}
}


export type ConfigActionsUnion =
  | LoadDeliveryTimes
  | LoadDeliveryTimesComplete
  | LoadDeliveryTimesError
  | LoadImages
  | LoadImagesComplete
  | LoadImagesError;
