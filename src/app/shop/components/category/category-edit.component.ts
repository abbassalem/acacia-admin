import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateCategory, Load, RemoveCategory, UpdateCategory } from '../../actions/category.actions';
import { Category } from '../../models/category.model';
import { getAllCategories } from '../../reducers';
import * as fromCategory from '../../reducers/categories.reducer';
import * as fromConfig from '../../../core/reducers/configuration.reducer';
import { LoadImages } from 'src/app/core/actions/configuration.actions';
import { Image } from 'src/app/core/models/config.model';
import { Product } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-category-edit',
  templateUrl: 'category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})

export class CategoryEditComponent implements OnInit {

  categoryForm: FormGroup;
  productForm: FormGroup;
  categoryList$: Observable<any>;
  imageList$: Observable<Array<Image>>;
  mode: string = 'none';
  currentCatIndex: number;
  currentProductLength: number;

  constructor(private categoryStore: Store<fromCategory.CategoryState>,
    private dialog: MatDialog,
    private configStore: Store<fromConfig.ConfigState>) {
  }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      products: new FormArray([])
    });

    this.categoryStore.dispatch(new Load()); // load all categories
    this.configStore.dispatch(new LoadImages()); // load all the images

    this.imageList$ = this.configStore.select(fromConfig.getImages);
    this.categoryList$ = this.categoryStore.select(getAllCategories);
  }

  save() {
    if (this.categoryForm.valid) {
      let indexedProducts: Array<Product> = new Array();
          this.productArray.controls.forEach((c: AbstractControl, index: number) => {
            indexedProducts.push({
              id: index + 1,
              name: c.get('name').value, description: c.get('description').value,
              price: c.get('price').value, reference: c.get('reference').value, imageUrl: c.get('imageUrl').value
            });
          });
      switch (this.mode) {
        case 'add': {        
          const newCat: Category = Object.assign({...this.categoryForm.value, products: indexedProducts});
          this.categoryStore.dispatch(new CreateCategory(newCat));
          break;
        }
        case 'edit': {
          let  updateCat: Category = Object.assign({...this.categoryForm.value}, {id: this.categoryForm.get('id').value}, {products: indexedProducts});
          this.categoryStore.dispatch(new UpdateCategory(updateCat));
          break;
        } 
      }

      this.mode = 'none';
      this.currentCatIndex = undefined;
      this.setFormValue();
    }
  }

  addCategory() {
    this.mode = 'add';
    this.currentCatIndex = undefined;
    this.setFormValue();
  }

  editCategory(cat: Category, index: number) {
    this.currentCatIndex = index;
    this.mode = 'edit';
    this.currentCatIndex = index;
    this.setFormValue(cat);
  }

  removeCategory(cat: Category, index: number) {
    this.currentCatIndex = index;
    this.mode = 'remove';
    const message = `Deleting Category  [${cat.name}] ?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.categoryStore.dispatch(new RemoveCategory(cat.id));
        this.mode = 'none';
        this.currentCatIndex = undefined;
      }
    });
  }

  cancel() {
    this.mode = 'none';
    this.setFormValue();
    this.currentCatIndex = undefined;
  }

  setFormValue(cat?: Category) {
    if (cat) {
      this.categoryForm.get('id').setValue(cat.id);
      this.categoryForm.get('name').setValue(cat.name);
      this.categoryForm.get('description').setValue(cat.description);

      if (cat.products) {
        (<FormArray>this.categoryForm.get('products')).clear();
        for (let prod of cat.products) {
          (<FormArray>this.categoryForm.get('products')).push(
            new FormGroup({
              // id: new FormControl({ value: prod.id, disabled: true }),
              name: new FormControl(prod.name),
              price: new FormControl(prod.price),
              description: new FormControl(prod.description),
              reference: new FormControl(prod.reference),
              imageUrl: new FormControl(prod.imageUrl)
            }))
        }
      }
    } else {
      this.categoryForm.get('id').setValue('');
      this.categoryForm.get('name').setValue('');
      this.categoryForm.get('description').setValue('');
      (<FormArray>this.categoryForm.get('products')).clear();
    }
  }

  get productArray(): FormArray {
    return <FormArray>this.categoryForm.get('products');
  }

  newProduct(): FormGroup {
    return new FormGroup({
      // id: new FormControl({ value: this.productArray.length  +1, disabled: false }),
      name: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      description: new FormControl(''),
      reference: new FormControl(''),
      imageUrl: new FormControl('')
    })
  }

  addProduct() {
    let prod = this.newProduct();
    this.productArray.push(prod);
  }

  removeProduct(index: number) {
    this.productArray.removeAt(index);
  }
}
