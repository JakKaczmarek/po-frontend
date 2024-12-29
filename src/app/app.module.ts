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
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DialogModule } from 'primeng/dialog';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UserOffersComponent } from './job-offers/user-offers/user-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListOffersComponent,
    CreateOfferComponent,
    OfferDetailsComponent,
    NavbarComponent,
    UserOffersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MessageModule,
    PasswordModule,
    RadioButtonModule,
    ToastModule,
    DialogModule
  ],
  providers: [MessageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
