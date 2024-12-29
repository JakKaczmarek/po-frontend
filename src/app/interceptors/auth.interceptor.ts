import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Pobierz token z localStorage
        const token = localStorage.getItem('authToken');

        if (token) {
            // Klonuj żądanie i dodaj nagłówek Authorization
            const authReq = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return next.handle(authReq);
        }

        // Jeśli brak tokena, przekaż żądanie bez zmian
        return next.handle(request);
    }
}
