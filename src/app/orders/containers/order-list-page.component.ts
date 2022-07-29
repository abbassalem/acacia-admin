import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderSearchCriteria, Order } from '../../shop/models/order.model';
import * as fromAuthReducer from '../../../app/auth/reducers/auth.reducer';
import * as fromOrderReducer from '../reducers/orders.reducer';
import { Load, PaidChange, Reset, StatusChange } from '../actions/orders.actions';
import * as fromAuthActions from '../../auth/actions/auth.actions'
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-order-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <app-order-search [fetchedUsers$]="fetchedUsers$" (searchCriteriaChange)= "executeQuery($event)" [orderCount]="orderCount" 
        (usersForAutoChange)="fetchUsersForAuto($event)" >
  </app-order-search>
  
  <app-order-list [orderList]="orders$ | async"  
      [disabledButtons]="pageDisabledButtons"   
      (toggleDisabledChanged) = "disableButtons($event)"
      (payChange) = "executePay($event)"
      (deliverChange) = "executeDeliver($event)"
      (cancelChange) = "executeCancel($event)"
       >
  </app-order-list> `,

  styles: [
    ` .mat-tab-label-active {
      background-color: #5EADB0;
      color: #D5FEFF;
      border: 1px solid #6B7F7F;
      font-weight: bold;
  }`]
})

export class OrderListPageComponent {

  orders$: Observable<Order[]>;
  orderCount: number;
  selectedOrderId$: Observable<string>;
  fetchedUsers$: Observable<Array<User>>;
  currentSearchCriteria: OrderSearchCriteria;
  pageDisabledButtons: boolean = true;

  constructor(private authStore: Store<fromAuthReducer.State>, 
              private orderStore: Store<fromOrderReducer.OrderState>) {
  }
  
  disableButtons (disabled: boolean){
    this.pageDisabledButtons = disabled;
  }

  fetchUsersForAuto(email: string) {
      this.authStore.dispatch(new fromAuthActions.FetchedUsers(email));
      this.fetchedUsers$ = this.authStore.select(fromAuthReducer.getFetchedUsers);
  }

  executeQuery(orderSearchCriteria: OrderSearchCriteria) {
    this.currentSearchCriteria = orderSearchCriteria;
    let payload = {orderSearchCriteria: orderSearchCriteria};
    this.orderStore.dispatch(new Reset);
    this.orderStore.dispatch(new Load(payload));
    this.orders$ = this.orderStore.select(fromOrderReducer.getOrders);
    this.orders$.subscribe( orders => this.orderCount = orders.length)
    this.pageDisabledButtons = true;
  }

  executePay(event){
    let payload = {field: 'paid', value:true, ids: event};
    this.orderStore.dispatch(new PaidChange(payload));
    this.executeQuery(this.currentSearchCriteria);
  }

  executeDeliver(event){
    let payload = {field: 'status', value:'DELIVERED', ids: event};
    this.orderStore.dispatch(new StatusChange(payload));
    // this.currentSearchCriteria.status = 'ALL';
    this.executeQuery(this.currentSearchCriteria);
  }

  executeCancel(event) {
    let payload = {field: 'status', value:'CANCELLED', ids: event};
    this.orderStore.dispatch(new StatusChange(payload));
    // this.currentSearchCriteria.status = 'ALL';
    this.executeQuery(this.currentSearchCriteria);
  }

}
