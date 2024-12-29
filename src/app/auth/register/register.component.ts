import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

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
  userType: 'user' | 'company' = 'user';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  onRegister() {
    if (!this.email || !this.password || !this.firstName || !this.lastName || !this.phone) {
      this.messageService.add({
        severity: 'error',
        summary: 'Błąd',
        detail: 'Wypełnij wszystkie pola!'
      });
      return;
    }

    const registerData = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      isCompany: this.userType === 'company'
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Zarejestrowano pomyślnie!'
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Błąd rejestracji';
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd',
          detail: errorMsg
        });
      }
    });
  }
}
