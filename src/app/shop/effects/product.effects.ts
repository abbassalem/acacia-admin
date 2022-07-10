import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import * as fromCategoryActions from '../actions/category.actions';
import { Category } from '../models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  getAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.Load>(fromCategoryActions.CategoryActionTypes.Load),
      switchMap((action) =>
        this.productService.getCategories().pipe(
          map((cats: Array<Category>) =>{
            return new fromCategoryActions.LoadComplete(cats);
          }
          ),
          catchError(err => of(new fromCategoryActions.LoadError(err)))
        )
      )
    )
  );

  getAllCategoriesSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<fromCategoryActions.LoadComplete>(fromCategoryActions.CategoryActionTypes.LoadComplete),
      map(action =>
        console.dir('getAllCategoriesSuccess')
        // this.snackBar.open(`[${action.payload.length}] categories loaded successfully.`, 'Close',{
        //     duration: 2000,
        //     panelClass: ["snack-notification"],
        //     horizontalPosition: "center",
        //     verticalPosition: "top"
        // })
      )
    )
  }, { dispatch: false }
  )

  getAllCategoriesError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<fromCategoryActions.LoadError>(fromCategoryActions.CategoryActionTypes.LoadError),
      map(action =>
        this.snackBar.open(`Error in loading Categories [${action.payload}].`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        })
      )
    )
  }, { dispatch: false }
  )

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.CreateCategory>(fromCategoryActions.CategoryActionTypes.CreateCategory),
      switchMap((action) =>
        this.productService.createCategory(action.payload).pipe(
          map((result) => {
            console.dir(result.id);
            return new fromCategoryActions.CreateCategoryComplete(result);
          }),
          catchError(err => of(new fromCategoryActions.CreateCategoryError(err)))
        )
      )
    )
  )

  createCategorySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.CreateCategoryComplete>(fromCategoryActions.CategoryActionTypes.CreateCategoryComplete),
      map(action => {
        this.snackBar.open(`Category [${action.payload.name}] saved successfully.`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        });
        return new fromCategoryActions.Load();
      }),
      catchError(err => of(err))
    )
  )

  createCategoryError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<fromCategoryActions.CreateCategoryError>(fromCategoryActions.CategoryActionTypes.CreateCategoryError),
      map(action =>
        this.snackBar.open(`Error in creating Category [${action.payload}].`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        })
      )
    )
  }, { dispatch: false })


  removeCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.RemoveCategory>(fromCategoryActions.CategoryActionTypes.RemoveCategory),
      switchMap(action =>
        this.productService.removeCategory(action.payload).pipe(
          map(catResult => {
            return new fromCategoryActions.RemoveCategoryComplete(catResult.catId);
          }),
          catchError(err => of(new fromCategoryActions.RemoveCategoryError(err)))
        )
      )
    )
  );

  removeCategorySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.RemoveCategoryComplete>(fromCategoryActions.CategoryActionTypes.RemoveCategoryComplete),
      map(action => {
        this.snackBar.open(`Category [CategoryId [${action.payload}]] removed successfully.`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        });
        return new fromCategoryActions.Load();
      })
    )
  );

  removeCategoryError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<fromCategoryActions.RemoveCategoryError>(fromCategoryActions.CategoryActionTypes.RemoveCategoryError),
      map(action =>
        this.snackBar.open(`Error in removing Category [${action.payload}].`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        })
      )
    )
  }, { dispatch: false });


  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.CreateProduct>(fromCategoryActions.CategoryActionTypes.CreateProduct),
      switchMap(action =>
        this.productService.createProduct(action.payload.catId, action.payload.product).pipe(
          map(prodResult => {
            console.log('create product - productservice');
            console.dir(prodResult);
            return new fromCategoryActions.CreateProductComplete(prodResult);
          }),
          catchError(err => of(new fromCategoryActions.CreateProductError(err)))
        )
      )
    )
  )

  createProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.CreateProductComplete>(fromCategoryActions.CategoryActionTypes.CreateProductComplete),
      map(action => {
        this.snackBar.open(`Product [${action.payload.product.name} in CategoryId [${action.payload.catId}]]saved successfully.`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        });
        // this.router.navigate(['categories/', action.payload.catId]);
        return new fromCategoryActions.Load();
      })
    )
  )

  createProductError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<fromCategoryActions.CreateProductError>(fromCategoryActions.CategoryActionTypes.CreateProductError),
      map(action =>
        this.snackBar.open(`Error in creating Product [${action.payload}].`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        })
      )
    )
  }, { dispatch: false })

  removeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.RemoveProduct>(fromCategoryActions.CategoryActionTypes.RemoveProduct),
      switchMap(action =>
        this.productService.removeProduct(action.payload.catId, action.payload.prodId).pipe(
          map(prodResult => {
            console.log('remove product - productservice');
            console.dir(prodResult);
            return new fromCategoryActions.RemoveProductComplete({ catId: prodResult.catId, prodId: prodResult.prodId });
          }),
          catchError(err => of(new fromCategoryActions.RemoveProductError(err)))
        )
      )
    )
  )

  removeProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.RemoveProductComplete>(fromCategoryActions.CategoryActionTypes.RemoveProductComplete),
      map(action => {
        this.snackBar.open(`Product [${action.payload.prodId} in CategoryId [${action.payload.catId}]] removed successfully.`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        });
        // this.router.navigate(['categories/', action.payload.catId]);
        return new fromCategoryActions.Load();
      })
    )
  )

  removeProductError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<fromCategoryActions.RemoveProductError>(fromCategoryActions.CategoryActionTypes.RemoveProductError),
      map(action =>
        this.snackBar.open(`Error in removing Product [${action.payload}].`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        })
      )
    )
  }, { dispatch: false })
}


