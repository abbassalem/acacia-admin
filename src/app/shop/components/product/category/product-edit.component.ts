import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfigService } from 'src/app/core/services/config.service';
import { Product } from 'src/app/shop/models/product.model';
import { CategoryState } from '../../../reducers/categories.reducer';
import { CreateProduct } from './../../../actions/category.actions'

@Component({
  selector: 'app-edit-product',
  templateUrl: 'product-edit.component.html'
})

export class ProductyEditComponent implements OnInit, OnChanges {

  productForm: UntypedFormGroup;
  nextProductId: number;
  isVisible: boolean = false;

  @Input()
  categoryId: string;

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private store: Store<CategoryState>, private dbService: ConfigService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.dbService.getNextProductId(this.categoryId);
    this.dbService.nextProductId$.subscribe(newId => {
      this.nextProductId = newId;
      console.log('inside ngchanges nextproductId = ' + this.nextProductId);
    });
  }

  ngOnInit() {
    console.log('categoryId = ' + this.categoryId);
    this.productForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', [Validators.required]),
      price: new UntypedFormControl('', [Validators.required]),
      reference: new UntypedFormControl('', []),
      image: new UntypedFormControl('', []),
    });
    
  }

  save() {
    console.log('catid: ' + this.categoryId);
    if (this.productForm.valid) {
      const newProd: Product = Object.assign(this.productForm.value,
        { id: this.nextProductId });
      this.store.dispatch(
        new CreateProduct({ catId: this.categoryId, product: newProd }));

      this.close.emit(false);
    }
  }

  // showForm() {
  //   this.isVisible = true;
  // }

  cancelForm() {
    this.close.emit(false);
  }
}