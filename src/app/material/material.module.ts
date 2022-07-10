import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  imports: [
    MatExpansionModule,
    MatInputModule ,
    MatCardModule ,
    MatButtonModule ,
    MatSidenavModule ,
    MatDividerModule,
    MatListModule ,
    MatIconModule ,
    MatToolbarModule ,
    MatTabsModule ,
    MatProgressSpinnerModule ,
    MatBadgeModule ,
    MatTableModule ,
    MatCheckboxModule ,
    MatSelectModule ,
    MatGridListModule ,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule ,
    MatRadioModule ,
    MatSnackBarModule ,
    MatGridListModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDialogModule,
    AgGridModule.forRoot()
  ],
  exports: [
    MatExpansionModule,
    MatInputModule ,
    MatCardModule ,
    MatButtonModule ,
    MatSidenavModule ,
    MatListModule ,
    MatIconModule ,
    MatToolbarModule ,
    MatTabsModule ,
    MatProgressSpinnerModule ,
    MatBadgeModule ,
    MatTableModule ,
    MatCheckboxModule ,
    MatSelectModule ,
    MatGridListModule ,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule ,
    MatRadioModule ,
    MatSnackBarModule ,
    MatGridListModule,
    MatMenuModule,
    MatAutocompleteModule,
    AgGridModule
  ],
})
export class MaterialModule {}
