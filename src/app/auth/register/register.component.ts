import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  phone = '';

  // Zmienna do przechowywania wyboru typu użytkownika (radio):
  // 'user' = zwykły użytkownik, 'company' = firma
  userType: 'user' | 'company' = 'user';

  errorMessage = '';
  successMessage = '';

  constructor() { }

  onRegister() {
    // Prosta walidacja pol wymagalnych
    if (!this.email || !this.password || !this.firstName || !this.lastName || !this.phone) {
      this.errorMessage = 'Wypełnij wszystkie pola!';
      this.successMessage = '';
      return;
    }

    // Wyliczamy isCompany w zależności od wybranej opcji:
    const isCompany = this.userType === 'company';

    // Przygotowujemy obiekt do wysłania na backend:
    const registerData = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      isCompany: isCompany
    };

    // Tu normalnie wysyłasz dane do backendu, np.:
    // this.authService.register(registerData).subscribe({
    //   next: () => {
    //     this.successMessage = 'Zarejestrowano pomyślnie!';
    //     this.errorMessage = '';
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.error?.message || 'Błąd rejestracji';
    //   }
    // });

    // Na potrzeby przykładu tylko symulujemy rejestrację:
    console.log('Dane rejestracyjne:', registerData);
    this.successMessage = 'Zarejestrowano pomyślnie!';
    this.errorMessage = '';
  }
}
