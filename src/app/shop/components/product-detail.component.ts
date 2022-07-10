import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  template: `
    
    <mat-card *ngIf="product">
      <mat-card-title>
    
      <span>{{ name }}
           <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
      </span> 
       
      </mat-card-title>
      <mat-card-content> 
          <span style="font-size: 11px" [innerHtml]="description"> </span>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="warn"  (click)="remove.emit(product)">
            Cancel
            <mat-icon>cancel</mat-icon>
        </button>
        <p  *ngIf="valid">
            <button mat-raised-button color="primary"  (click)="add.emit(product)">
                Save
                <mat-icon>loupe</mat-icon>
            </button>
        </p>
      
      </mat-card-actions>
   
    </mat-card>
  `,
  styles: [
    `
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    mat-card {
      max-width: 600px;
    }
    mat-card-title-group {
      margin-left: 0;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    mat-card-content {
      margin: 15px 0 50px;
    }
    mat-card-actions {
      margin: 25px 0 0 !important;
    }¦
    mat-card-footer {
      padding: 0 25px 25px;
      position: relative;
    }
  `,
  ],
})
export class ProductDetailComponent {

  @Input() product: Product;
  @Input() quantity: number;
  @Input() inBasket: boolean;
  @Input() valid = false;
  @Output() add = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();

  constructor() {
  }

  get id() {
    return this.product.id;
  }

  get name() {
    return this.product.name;
  }

  get description() {
    return this.product.description;
  }

  get thumbnail() {
    return (
       'assets/images/app/' + `${this.product.imageUrl}`
    );
  }


}
