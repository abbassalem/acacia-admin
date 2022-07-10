import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { ToolbarComponent } from './components/toolbar.component';
import { AppComponent } from '../app.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { HomePageComponent } from './containers/home-page.component';
import { ConfirmDialogComponent } from '../shared/dialogs/confirm-dialog.component';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  ToolbarComponent,
  HomePageComponent,
  ConfirmDialogComponent
];

@NgModule({
  imports: [CommonModule, 
    RouterModule, 
    MaterialModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
