import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromAuthActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { Reset } from '../../orders/actions/orders.actions';
import { OrderState } from '../../orders/reducers/orders.reducer';
import { Store } from '@ngrx/store';
import { User } from '../models/user';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private orderStore: Store<OrderState>,
  ) {}


  login$ = createEffect( () => {
    return this.actions$.pipe(
      ofType<fromAuthActions.Login>(fromAuthActions.AuthActionTypes.Login),
        switchMap( action => this.authService.SignIn(action.payload.email, action.payload.password)
          .then(
            user => {
                return new fromAuthActions.LoginComplete(user);
              }
          )
          .catch(
              error => new fromAuthActions.LoginError(error)
          )
        )
    )
  }, {dispatch: true});

  loginSuccess$ = createEffect ( () => {
    return this.actions$.pipe(
      ofType(fromAuthActions.AuthActionTypes.LoginComplete),
      tap(() => {
        this.router.navigate(['home']);
      })
  )}, {dispatch: false}
  );

  loginRedirect$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(fromAuthActions.AuthActionTypes.LoginRedirect, fromAuthActions.AuthActionTypes.Logout),
      tap(authed => {
        this.orderStore.dispatch(new Reset());
        this.router.navigate(['/login']);
      })
    )}, {dispatch: false}
  );

  fetchUsers$ = createEffect( () => {
    let users: Array<User>;
    return this.actions$.pipe(
          ofType<fromAuthActions.FetchedUsers>(fromAuthActions.AuthActionTypes.FetchedUsers),
          switchMap( (action: fromAuthActions.FetchedUsers) => 
            this.authService.fetchUsers(action.payload)
          ),
          map( q => {
            users = q.docs.map( doc => <User>doc.data());
            return new fromAuthActions.FetchedUsersComplete(users);
          }),
          catchError (error => of(error))
      )
  }, {dispatch: true}
  );

  fetchUsersSuccess$ =  createEffect( () => {
    return this.actions$.pipe(
        ofType<fromAuthActions.FetchedUsersComplete>(fromAuthActions.AuthActionTypes.FetchedUsersComplete),
            switchMap( (action) => {   
            return of(null);
            }
      ))
    }, { dispatch: false });
  

    loadOrderUsers$ = createEffect( () => {
      let user: User;
      return this.actions$.pipe(
            ofType<fromAuthActions.LoadOrderUser>(fromAuthActions.AuthActionTypes.LoadOrderUser),
            switchMap( (action: fromAuthActions.LoadOrderUser) => 
              this.authService.loadUser(action.payload)
            ),
            map( q => {
              user = <User>q.docs[0].data();
              return new fromAuthActions.LoadOrderUserComplete(user);
            }),
            catchError (error => of(error))
        )
    }, {dispatch: true}
    );
  
    loadOrderUserSuccess$ =  createEffect( () => {
      return this.actions$.pipe(
          ofType<fromAuthActions.LoadOrderUserComplete>(fromAuthActions.AuthActionTypes.LoadOrderUserComplete),
              switchMap( (action) => {     
              return of(null);
              }
        ))
      }, { dispatch: false });

}
