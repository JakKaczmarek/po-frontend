import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListOffersComponent } from './job-offers/list-offers/list-offers.component';
import { CreateOfferComponent } from './job-offers/create-offer/create-offer.component';
import { OfferDetailsComponent } from './job-offers/offer-details/offer-details.component';

const routes: Routes = [
  // Kiedy wchodzimy na '/', chcemy przekierować na '/login'
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Logowanie, rejestracja
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Oferty pracy
  { path: 'offers', component: ListOffersComponent },
  { path: 'offers/new', component: CreateOfferComponent },
  { path: 'offers/:id', component: OfferDetailsComponent },

  // (opcjonalnie) 404 page
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
