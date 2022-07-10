import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteLink } from '../containers/product-list-page.component';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-list-product',
  template: `
  <mat-toolbar>
    <span class="toolbar-flex">
      <nav mat-tab-nav-bar [backgroundColor]="'secondary'">
        <a mat-tab-link 
            *ngFor="let routeLink of routeLinks; let i=index"
              [routerLink]="routeLink.path"
              routerLinkActive #rla="routerLinkActive"
              [active]="rla.isActive">
              <span style="color: blue">{{routeLink.label}} &nbsp; &nbsp;</span>
              
              <button *ngIf="rla.isActive" style="color:green; font-weight: bold"  
                [color]="'secondary'"  mat-button
                (click)="editFormVisible =true">
                <mat-icon matBadge="+" matBadgePosition="above before" matBadgeColor="green"  
                style="color:green" >list</mat-icon>
              </button>   
        </a>

      </nav>
    </span>
</mat-toolbar>

<div style="display:flex; flex-wrap: wrap; align-content: flex-start;" *ngIf= "!editFormVisible">
    <app-product-view  *ngFor="let product of products" [product]="product">
    </app-product-view>
</div>

<app-edit-product *ngIf= "editFormVisible" [categoryId]="routeLinks[currentTabIndex].catId" 
    (close)="hideForm($event)" >
</app-edit-product>

`,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .toolbar-flex{
      flex: 1 0.5 auto;
      float:left
    }
  `,
  ],
})

export class ProductListComponent implements OnInit, OnChanges {

  @Input() categories$: Observable<Category[]>;
  @Input() routeLinks: Array<RouteLink>;
  
  categories: Category[];
  products: Array<Product>;
  @Input() currentTabIndex = 0 ;
  @Output() changeCategoryIndex: EventEmitter<number> = new EventEmitter();
  editFormVisible: boolean = false;

  constructor() {
  }

   ngOnInit() {

    this.categories$.subscribe( cats => {
      console.log('currentTabIndex: ' + this.currentTabIndex);
      this.categories = cats;

      if (this.categories[this.currentTabIndex]) {
        this.products = cats[this.currentTabIndex].products;
        this.changeCategoryIndex.emit(this.currentTabIndex);
      }
      });
   
   }

   ngOnChanges(changes: SimpleChanges): void {

    if (this.categories && this.categories[this.currentTabIndex]) {
      this.products = this.categories[this.currentTabIndex].products;
      this.changeCategoryIndex.emit(this.currentTabIndex);
    }

   }

  hideForm(event){
    this.editFormVisible = false;
  }

  showForm(){
     this.editFormVisible = true;
  }

  
}
