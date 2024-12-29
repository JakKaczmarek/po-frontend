import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobOfferService } from '../../services/job-offer.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private jobOfferService: JobOfferService
  ) { }

  ngOnInit(): void {
    const offerId = this.route.snapshot.params['id'];
    this.loadApplications(offerId);
  }

  private loadApplications(offerId: number): void {
    this.jobOfferService.getApplications(offerId).subscribe({
      next: (data) => {
        this.applications = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Nie udało się załadować aplikacji.';
        this.loading = false;
      }
    });
  }

  downloadCV(cvFile: string): void {
    // Dodaj pełny URL do pliku
    const fileUrl = `http://localhost:8000${cvFile}`;
    window.open(fileUrl, '_blank');
  }

}
