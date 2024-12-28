import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListOffersComponent } from './job-offers/list-offers/list-offers.component';
import { CreateOfferComponent } from './job-offers/create-offer/create-offer.component';
import { OfferDetailsComponent } from './job-offers/offer-details/offer-details.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListOffersComponent,
    CreateOfferComponent,
    OfferDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
