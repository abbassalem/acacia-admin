import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Category } from '../models/category.model';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import { FIREBASE_APP_NAME } from '@angular/fire/compat';
import { Product } from '../models/product.model';
import { arrayRemove, arrayUnion, DocumentReference } from 'firebase/firestore';


@Injectable({providedIn: 'any', useExisting: FIREBASE_APP_NAME, useValue: 'db'}
)

export class ProductService {
  categories: Array<Category>;
  history: any;
  placedOrderSuccess = false;

  constructor(private db: AngularFirestore) {
  }

  getCategories(): Observable<Array<Category>> {
    let cats: Array<Category> = new Array();
    return this.db.collection('categories').snapshotChanges().pipe(
      map( snapshot => {
        cats = snapshot.map(action =>{ 
          let cat = action.payload.doc.data() as Category;
          cat.id = action.payload.doc.id;
          return cat;
        });
        return cats;
      })
    )
  }

  createCategory(cat: Category): Observable<any> {
    let p = this.db.collection('categories').add(cat);
    return of(p);  
  } 

  removeCategory(catId: string): Observable<any> {
    const p = this.db.collection('categories').doc(catId).delete();
      return of({catId: catId});
  }

  updateCategory(cat: Category): Observable<any> {
    const p = this.db.collection('categories').doc(cat.id).update({name: cat.name, description: cat.description, products: cat.products});
      return of(cat);
  }

  // createProduct(catId: string, product: Product): Observable<any> {
  //   const p = this.db.collection('categories')
  //   .doc(catId.toString())
  //     .update({products: arrayUnion(product)});
    
  //     return of({catId: catId, product: product });
    
  //   }

  //   removeProduct(catId: number, prodId: number): Observable<any> {
  //     const p = this.db.collection('categories')
  //     .doc(catId.toString())
  //       .update({products: arrayRemove(prodId)});
      
  //       return of({catId: catId, prodId: prodId });
  //     }

}

