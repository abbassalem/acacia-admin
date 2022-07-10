import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { ProductListComponent } from './components/product-list.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { ProductViewComponent } from './components/product-view.component';
import { ProductListPageComponent } from './containers/product-list-page.component';
import { ProductViewPageComponent } from './containers/product-view-page.component';
import { ProductEffects } from './effects/product.effects';
import { reducers } from './reducers';
import { CategoryEditComponent } from './components/category/category-edit.component';
import { ProductyEditComponent } from './components/product/category/product-edit.component';
import { ProductService } from './services/product.service';
import { LargerImageDirective } from '../shared/directives/larger-image.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'categories', pathMatch: 'full'},
      { path: 'categories', component: CategoryEditComponent},
      // { path: 'categories/:id', component: ProductListPageComponent},
      // { path: 'products/:productId', component: ProductViewPageComponent},
      // { path: 'product/new', component: ProductyEditComponent},
    ]),

    StoreModule.forFeature('shop', reducers),
    EffectsModule.forFeature([ProductEffects]),
  ],
  declarations: [
    ProductViewPageComponent,
    ProductListPageComponent,
    ProductListComponent,
    ProductViewComponent,
    ProductDetailComponent,
    CategoryEditComponent,
    ProductyEditComponent,
    LargerImageDirective
  ],
  providers: [ProductService]
})

export class ShopModule {
  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: ShopModule,
      providers: []
    };
  }
}