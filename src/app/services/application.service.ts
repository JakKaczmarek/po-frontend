import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // Metoda do aplikowania na ofertę pracy
  applyToJobOffer(jobOfferId: number, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    return this.http.post(
      `${this.apiUrl}/job-offers/${jobOfferId}/apply`,
      formData,
      { headers }
    );
  }
}
