import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { DbService } from 'src/app/core/services/db.service';
import { CreateCategory, Load } from '../../actions/category.actions';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { getAllCategories } from '../../reducers';
import { CategoryState } from '../../reducers/categories.reducer';

@Component({
    selector: 'app-category-edit',
    templateUrl: 'category-edit.component.html',
    styleUrls: ['./category-edit.component.css']
  })
  
  export class CategoryEditComponent implements OnInit {
  
    categoryForm: FormGroup;
    productForm: FormGroup;
    categoryList$: Observable<any>;
    nextCategoryId: number;
    mode:string =  'none';

    constructor(private store: Store<CategoryState>, private dbService: DbService) {
    }
  
     ngOnInit() {
      this.categoryForm = new FormGroup({
        id: new FormControl({value: '', disabled: true}),
        name: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        reference: new FormControl('' ),
        image: new FormControl(''),
        products: new FormArray([])
      });
      // this.dbService.getNextCategoryId();
      // this.dbService.nextCategoryId$.subscribe(newId => this.nextCategoryId= newId) ;
      // this.categoryList = getCategoryArray();
      this.store.dispatch(new Load());
      this.categoryList$ = this.store.select(getAllCategories);
      // this.categoryList$.subscribe(result => console.dir(result));
    }

    save() {
      if(this.categoryForm.valid){
        const newCat: Category = Object.assign(this.categoryForm.value,{id: this.nextCategoryId});
        this.store.dispatch(
          new CreateCategory(newCat));
      }
    }

    addNew(){
      this.mode = 'add';
      this.initForm();
    }

    edit(cat: Category) {
      this.mode = 'edit';
      this.setFormValue(cat);
      // this.categoryForm.setValue(cat);
    }

    cancel() {
      this.mode = 'none';
      this.initForm();
    }

    initForm(){
      // this.categoryForm.reset() ;
      this.setFormValue();
    }

    setFormValue(cat?: Category){
      if(cat){
        this.categoryForm.get('id').setValue(cat.id);
        this.categoryForm.get('name').setValue(cat.name);
        this.categoryForm.get('description').setValue(cat.description);

        if(cat.products){
             (<FormArray>this.categoryForm.get('products')).clear(); 

              for (let prod of cat.products) {
                  (<FormArray>this.categoryForm.get('products')).push(
                    new FormGroup({
                      id: new FormControl(prod.id),
                      name: new FormControl(prod.name),
                      description: new FormControl(prod.description),
                      reference: new FormControl(prod.reference),
                      image: new FormControl(prod.image)
                }))
              }
          }
      } else{
          this.categoryForm.get('id').setValue('');
          this.categoryForm.get('name').setValue('');
          this.categoryForm.get('description').setValue('');
          this.categoryForm.get('reference').setValue('');
          this.categoryForm.get('image').setValue('');
          (<FormArray>this.categoryForm.get('products')).clear();

      }
    }

    get productArray() : FormArray {
      return <FormArray>this.categoryForm.get('products');
    }

    newProduct(): FormGroup {
        return new FormGroup({
          id: new FormControl({value: '', disabled: true}),
          name: new FormControl('', Validators.required),
          description: new FormControl(''),
          reference: new FormControl(''),
          image: new FormControl('')
        })
    }

    addProduct(){
      let prod = this.newProduct();
      this.productArray.push(prod);
    }

    removeProduct(index: number){
        console.dir(index);
        this.productArray.removeAt(index)
    }
  }

