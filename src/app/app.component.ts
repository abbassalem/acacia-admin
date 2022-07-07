import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from './auth/actions/auth.actions';
import * as fromRoot from './reducers';
import { User } from './auth/models/user';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<app-toolbar>
<button  mat-button [matMenuTriggerFor]="menu">Menu<mat-icon>menu</mat-icon></button>
    <mat-menu #menu="matMenu">
 
      <button mat-menu-item routerLink="/shop/categories/0">
          <mat-icon>list</mat-icon>
          Categories
      </button>
        
      <button mat-menu-item routerLink="/shop/category/new">
          <mat-icon>add</mat-icon>
          New Category
      </button>

      <button mat-menu-item routerLink="/gallery">
          <mat-icon>list</mat-icon>
          Gallery
      </button>

      <button mat-menu-item  routerLink="/orders" >
          <mat-icon>perm_media</mat-icon>
          Orders
      </button>
    
      <button mat-menu-item  (click)="logout()" >
        <mat-icon>phonelink_off</mat-icon>
        Sign Out
      </button>
</mat-menu>

         <div style="flex: 1 1 auto;flex-direction: row">
         <span class="login" >
              <span style="padding-right: 10px;color:white">Logged as: </span> <b>{{(user$ | async)?.displayName}}</b>
          </span>
        </div>
</app-toolbar>

<router-outlet></router-outlet>
  `,
  styles: [`.login {
    font-size: 12px;
    color: yellow;
    float: right;
    padding-right:20px;
  }`]
})


export class AppComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {
  
  }

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(fromRoot.isLoggedIn));
    this.user$ = this.store.pipe(select(fromRoot.getUser));
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
