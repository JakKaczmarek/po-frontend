import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobOfferService {
  private apiUrl = 'http://localhost:8000/api'; // Adres backendu Symfony

  constructor(private http: HttpClient) { }

  // Pobierz listę ofert pracy
  getJobOffers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job-offers`);
  }

  // Pobierz szczegóły oferty pracy
  getJobOfferDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/job-offer/${id}`);
  }

  // Utwórz nową ofertę pracy
  createJobOffer(jobOffer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/job-offers`, jobOffer);
  }

  getUserJobOffers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/job-offers`);
  }

  getApplications(offerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/job-offers/${offerId}/applications`);
  }
}
