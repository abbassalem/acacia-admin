import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, combineLatestWith } from 'rxjs/operators';
import { Order } from '../../shop/models/order.model';
import { OrderService } from '../services/orders.service';
import * as fromOrderActions from '../../orders/actions/orders.actions';
import * as fromOrderReducer from '../../orders/reducers/orders.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class OrdersEffects {

  constructor(private actions$: Actions, 
        private orderService: OrderService, 
        private snackBar: MatSnackBar,
        private authService: AuthService,
        private orderStore: Store<fromOrderReducer.OrderState>, 
        private router: Router) {
  }
  
  
  saveOrder$ = createEffect( () => {
    return this.actions$.pipe(
          ofType<fromOrderActions.SaveOrder>(fromOrderActions.OrderActionTypes.SaveOrder),
          switchMap( (action: fromOrderActions.SaveOrder) => 
            this.orderService.saveOrder(action.payload)
          ),
          map( (order) => {
              return new fromOrderActions.SaveOrderComplete(<Order>order);
            }),
          catchError (error => of(error))
          )
  }, {dispatch: true}
  );

  saveOrderSuccess$ =  createEffect( () => {
    return this.actions$.pipe(
        ofType<fromOrderActions.SaveOrderComplete>(fromOrderActions.OrderActionTypes.SaveOrderComplete),
        switchMap( (action) => {
            this.snackBar.open('Order saved successfully.', 'Close',{
            duration: 4000,
            panelClass: ["snack-notification"],
            horizontalPosition: "center",
            verticalPosition: "top"
            });

            this.orderStore.dispatch(new fromOrderActions.Reset());
            return this.router.navigate(['/']);
        })          
      )
    }, { dispatch: false });
  

  loadOrders$ = createEffect( () => {
    let ordersResult: Order[];
     return this.actions$.pipe(
      ofType<fromOrderActions.Load>(fromOrderActions.OrderActionTypes.Load),
      switchMap(action => this.orderService.getOrders(action.payload.orderSearchCriteria).pipe(
          combineLatestWith(this.authService.getAllUsers()),
          map(results  => {
              const [orders, users] = results;
              ordersResult = orders
                            .map(order => ({ ... order, orderUser: users.find(user => user.uid === order.userId)}));
              console.log('orderEffect: loadOrders$: userEmail');
              console.dir(ordersResult);           
              return new fromOrderActions.LoadComplete(ordersResult);
          })
        )
      ),
      catchError(err => of(new fromOrderActions.LoadError('error in loading orders')))
    )
  });

  paidOrder$ = createEffect( () => {
    return this.actions$.pipe(
          ofType<fromOrderActions.PaidChange>(fromOrderActions.OrderActionTypes.PaidChange),
          switchMap( action => 
            this.orderService.changePaidOrder(action.payload.field, action.payload.value, action.payload.ids)
          ),
          map(ids =>  new fromOrderActions.PaidChangeComplete(ids)),
          catchError (error => of(error))
          )
  }, {dispatch: true});

  paidOrderSuccess$ =  createEffect( () => {
    return this.actions$.pipe(
        ofType<fromOrderActions.PaidChangeComplete>(fromOrderActions.OrderActionTypes.PaidChangeComplete),
        switchMap( (action) => {
            this.snackBar.open('Orders paid successfully.', 'Close',{
            duration: 4000,
            panelClass: ["snack-notification"],
            horizontalPosition: "center",
            verticalPosition: "top"
            });
            return of(action.payload);
        })          
      )
    }, { dispatch: false });
  
    statusOrder$ = createEffect( () => {
      return this.actions$.pipe(
            ofType<fromOrderActions.StatusChange>(fromOrderActions.OrderActionTypes.StatusChange),
            switchMap( action => 
              this.orderService.changeStatusOrder(action.payload.field, action.payload.value, action.payload.ids)
            ),
            map( value =>  new fromOrderActions.StatusChangeComplete(value)),
            catchError (error => of(error))
            )
    }, {dispatch: true});
  
    statusOrderSuccess$ =  createEffect( () => {
      return this.actions$.pipe(
          ofType<fromOrderActions.StatusChangeComplete>(fromOrderActions.OrderActionTypes.StatusChangeComplete),
          switchMap( action => {
              this.snackBar.open('Orders status changed to ['+ action.payload.status +'] successfully.', 'Close',{
              duration: 4000,
              panelClass: ["snack-notification"],
              horizontalPosition: "center",
              verticalPosition: "top"
              });
              return of(action.payload);
          })          
        )
      }, { dispatch: false });
}
