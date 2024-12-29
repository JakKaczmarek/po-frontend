import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          // Zapisz token w localStorage
          localStorage.setItem('authToken', response.token);

          // Dekoduj token JWT i zapisz dane użytkownika
          const decodedToken: any = jwtDecode(response.token);
          localStorage.setItem('user', JSON.stringify(decodedToken));
        }
      })
    );
  }

  logout(): void {
    // Usuń dane z localStorage podczas wylogowania
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.roles?.includes(role) ?? false;
  }

  isCompany(): boolean {
    return this.hasRole('ROLE_COMPANY');
  }
}
