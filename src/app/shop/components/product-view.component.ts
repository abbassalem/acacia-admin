import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
//, {queryParams: {quantity:quantity}}
@Component({
  selector: 'app-product-view',
  template: `
      <mat-card>
      <a [routerLink]="['/shop/products', id]">
    
        <mat-card-title-group>
          <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
          <mat-card-title class="product-title" >{{ name }}</mat-card-title>
        </mat-card-title-group>
        <span class="price" style="float: right; margin-left: 10px">£ {{ price | number : '1.2-2'}} </span>
      </a>
       <span class="description" *ngIf="description">{{ description }}</span>
      <mat-card-actions>
          <button style="float:left: padding-botton:" color="secondary" mat-raised-button><mat-icon>edit</mat-icon>Edit</button>
          <button style="float:right" mat-raised-button color="secondary"><mat-icon>remove</mat-icon>Remove</button>
      </mat-card-actions>
      </mat-card>
   
  `,
  styles: [
    `
    :host {
      display: flex;
    }

    :host a {
      display: flex;
    }

    mat-card {
      width: 280px;
      height: 180px;
      margin: 5px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
      mat-card {
        margin: 15px 0 !important;
      }
    }
    mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    mat-card-title {
      margin-right: 10px;
    }
    mat-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
      margin-right: 5px;
    }
    mat-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    mat-card-footer {
      padding: 0 25px 25px;
    }
  `,
  ],
})
export class ProductViewComponent {
  
  @Input() product: Product;

  constructor() {
  }
  
  get id() {
    return this.product.id;
  }

  get description() {
    return this.product.description;
  }

  get name() {
    return this.product.name;
  }


  get thumbnail(): string | boolean {
    if (this.product.image) {
      return 'assets/images/app/' + `${this.product.image}`;
    }
    return false;
  }

  get price() {
    return this.product.price;
  }

}
