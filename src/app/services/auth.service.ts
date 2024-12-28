import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Twój backend Symfony

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Logowanie użytkownika
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        if (response.token) {
          this.saveToken(response.token);
        }
      }),
      catchError((error) => {
        console.error('Błąd logowania', error);
        return of(null); // Możesz obsłużyć błąd w komponencie
      })
    );
  }

  /**
   * Wylogowanie użytkownika
   */
  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  /**
   * Zapisz token do localStorage
   * @param token
   */
  private saveToken(token: string) {
    localStorage.setItem('authToken', token); // Możesz użyć sessionStorage
  }

  /**
   * Pobierz token z localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Usuń token z localStorage
   */
  private clearToken() {
    localStorage.removeItem('authToken');
  }

  /**
   * Sprawdź, czy użytkownik jest zalogowany
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
