import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { UserEffect } from './state/effects/user.effect';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state';
import { IsAdminDirective } from './shared/directives/is-admin.directive';
import { UserTextPipe } from './shared/pipes/user-text.pipe';
import { TokenInterceptor } from './shared/helpers/token.interceptor';
import { ErrorInterceptor } from './shared/helpers/http-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    IsAdminDirective,
    UserTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    EffectsModule.forRoot([UserEffect])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, // Will add token to each request
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true } // will handle error if api fails
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
