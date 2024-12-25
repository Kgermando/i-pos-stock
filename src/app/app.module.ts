import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr'; 

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CurrencyPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';  
import { CredentialInterceptor } from './auth/interceptors/credential.interceptor'; 

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(), 

    SharedModule,

    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialInterceptor,
      multi: true
    },
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    CurrencyPipe, { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
