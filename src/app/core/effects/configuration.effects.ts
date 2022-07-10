import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Image } from '../models/config.model';
import { ConfigService } from '../services/config.service';
import * as fromConfigActions from './../actions/configuration.actions';

@Injectable()
export class ConfigEffects {

  constructor(private actions$: Actions, private configService: ConfigService, private snackBar: MatSnackBar) {
  }

loadDeliveryTimes$ = createEffect( ()  =>  this.actions$.pipe(
  ofType<fromConfigActions.LoadDeliveryTimes>(fromConfigActions.ConfigActionTypes.LoadDeliveryTimes),
  switchMap( () => {
    return this.configService.getConfig().pipe(
      map( (config: any) => {
        const times = config.deliveryTimes;
        return new fromConfigActions.LoadDeliveryTimesComplete(times)
      }),
      catchError(err => of(new fromConfigActions.LoadDeliveryTimesError(err)))
    );
  })
));

loadImages$ = createEffect( ()  =>  
  this.actions$.pipe(
  ofType<fromConfigActions.LoadImages>(fromConfigActions.ConfigActionTypes.LoadImages),
  switchMap( (action) => 
    this.configService.getImages().pipe(
      map( (images: Array<Image>) => 
        new fromConfigActions.LoadImagesComplete(images)
      ),
      catchError(err => of(new fromConfigActions.LoadImagesError(err)))
    )
  ) 
))





loadImagesSuccess$ = createEffect ( () => {
  return this.actions$.pipe(
      ofType<fromConfigActions.LoadImagesComplete>(fromConfigActions.ConfigActionTypes.LoadImagesComplete),
      map( action => 
        console.log('loadImagesSuccess')
        // this.snackBar.open(`[${action.payload.length}] Images loaded successfully.`, 'Close',{
        //     duration: 2000,
        //     panelClass: ["snack-notification"],
        //     horizontalPosition: "center",
        //     verticalPosition: "top"
        // })
      )
    )
  }, {dispatch: false}
  )
  
}