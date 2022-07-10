import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ConfigEffects } from './core/effects/configuration.effects';
import { metaReducers, reducers } from './shared/reducers';
import { CustomRouterStateSerializer } from './shared/utils';
import { AngularFireModule, FIREBASE_APP_NAME } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './core/services/config.service';
import { AppRoutingModule } from 'app-routing.module';
import { LargerImageDirective } from './shared/directives/larger-image.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule.initializeApp(environment.firebaseWithDatabase,'db' ),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ConfigEffects]),
    StoreRouterConnectingModule.forRoot({
    stateKey: 'router',
    }),

    StoreDevtoolsModule.instrument({
      name: 'NgRx Acacia Store DevTools',
      logOnly: environment.production,
    }),

    CoreModule.forRoot(),
    AuthModule.forRoot()
  ],
  providers: [ConfigService, ConfigService,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 4000}},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    { provide: FIREBASE_APP_NAME, useValue: 'db' },
    // { provide: FIREBASE_OPTIONS, useValue: environment.firebaseWithDatabase }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}


