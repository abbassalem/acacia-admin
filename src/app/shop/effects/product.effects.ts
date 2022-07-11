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
        console.dir('getAllCategoriesSuccess - LOADED ALL')
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
        this.snackBar.open(`Category created successfully.`, 'Close', {
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
        this.snackBar.open(`Category with ID [${action.payload}] removed successfully.`, 'Close', {
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

  UpdateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.UpdateCategory>(fromCategoryActions.CategoryActionTypes.UpdateCategory),
      switchMap((action) =>
        this.productService.updateCategory(action.payload).pipe(
          map((result) => {
            return new fromCategoryActions.UpdateCategoryComplete(result);
          }),
          catchError(err => of(new fromCategoryActions.UpdateCategoryError(err)))
        )
      )
    )
  )

  UpdateCategorySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.UpdateCategoryComplete>(fromCategoryActions.CategoryActionTypes.UpdateCategoryComplete),
      map(action => {
        this.snackBar.open(`Category [${action.payload.name}] updated successfully.`, 'Close', {
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

  UpdateCategoryError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<fromCategoryActions.UpdateCategoryError>(fromCategoryActions.CategoryActionTypes.UpdateCategoryError),
      map(action =>
        this.snackBar.open(`Error in creating Category [${action.payload}].`, 'Close', {
          duration: 4000,
          panelClass: ["snack-notification"],
          horizontalPosition: "center",
          verticalPosition: "top"
        })
      )
    )
  }, { dispatch: false });

}


