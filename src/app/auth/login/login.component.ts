import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  public onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Wypełnij oba pola!';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response?.token) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sukces',
            detail: 'Zalogowano pomyślnie!',
          });
          this.router.navigate(['/offers']);
        } else {
          this.errorMessage = 'Nieprawidłowe dane logowania.';
          this.messageService.add({
            severity: 'error',
            summary: 'Błąd logowania',
            detail: 'Nieprawidłowy email lub hasło!',
          });
        }
      },
      error: (err) => {
        const errorMsg = 'Błąd logowania';
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd',
          detail: errorMsg
        });
      }
    }
    );
  }

  public onRegister() {
    this.router.navigate(['/register']);
  }
}
