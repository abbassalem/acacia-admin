import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import * as fromCategoryActions from '../actions/category.actions';
import { Category } from '../models/category.model';
import * as fromCategories from '../reducers/categories.reducer';
import * as index from './../reducers/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-list-product
        [categories$]="categories$.asObservable()"
        [routeLinks]="routeLinks"
        [currentTabIndex] = "currentCategoryIndex"
        (changeCategoryIndex)="setCurrentCategoryIndex($event)">
    </app-list-product>
  `,
  styles: [
    ` .mat-tab-label-active {
      background-color: #5EADB0;
      color: #D5FEFF;
      border: 1px solid #6B7F7F;
      font-weight: bold;
  }
  .mat-tab-link,
  .mat-tab-label {
      line-height: 30px !important;
      height: 30px !important;
      min-width: 100px !important;
      border: 1px solid #7e7e7e;
  }
  .tabContentContainer {
      border: 1px solid #aaaaaa;
      background: #ffffff 50% 50% repeat-x;
  }`]
})

export class ProductListPageComponent implements OnInit {

  routeLinks: Array<RouteLink> = new Array<RouteLink>();
  categories: Array<Category>;
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject(null);
  selectedCategoryId: string;
  currentCategoryIndex: number;

  constructor(private store: Store<fromCategories.CategoryState>, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.store.dispatch(new fromCategoryActions.Load);
    this.store.select(index.getAllCategories).subscribe( cats => {
        this.categories$.next(cats);
        cats.forEach((cat, i) => 
            this.routeLinks.push({catId: cat.id, label: cat.name, path: '/shop/categories/' + i}));
        this.selectedCategoryId  = this.routeLinks[this.currentCategoryIndex].catId;
        this.store.dispatch(new fromCategoryActions.SelectCategory(this.selectedCategoryId))
    });

    this.route.paramMap.subscribe( params => {
        this.currentCategoryIndex = +params.get('id');
        console.log('pathVariable : ' + this.currentCategoryIndex);
        if( this.routeLinks[this.currentCategoryIndex].catId ) {
          this.selectedCategoryId  = this.routeLinks[this.currentCategoryIndex].catId;
          console.log('selectedCategoryId router: ' + this.selectedCategoryId );
          this.store.dispatch(new fromCategoryActions.SelectCategory(this.selectedCategoryId));
        }
    })
  }

  setCurrentCategoryIndex(index: number) {
    this.currentCategoryIndex = index;
  }  
}


export interface RouteLink {
  catId: string;
  label: string;
  path: string
}