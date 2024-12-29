import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOfferService } from '../../services/job-offer.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent implements OnInit {
  jobOffer: any;
  loading: boolean = false;
  errorMessage: string = '';
  selectedFile: File | null = null;
  showDialog: boolean = false; // Kontroluje widoczność popupu

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobOfferService: JobOfferService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    const offerId = this.route.snapshot.params['id'];
    this.loadJobOfferDetails(offerId);
  }

  private loadJobOfferDetails(id: number): void {
    this.loading = true;
    this.jobOfferService.getJobOfferDetails(id).subscribe(
      (data) => {
        this.jobOffer = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Nie udało się załadować szczegółów oferty.';
        this.loading = false;
      }
    );
  }

  navToOffers(): void {
    this.router.navigate(['/offers'])
  }

  openDialog(): void {
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.selectedFile = null; // Resetuj wybrany plik
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onApply(): void {
    if (!this.selectedFile) {
      alert('Proszę wybrać plik CV (PDF).');
      return;
    }

    const formData = new FormData();
    formData.append('cvFile', this.selectedFile);

    this.applicationService
      .applyToJobOffer(this.jobOffer.id, formData)
      .subscribe(
        () => {
          alert('Aplikacja została pomyślnie wysłana!');
          this.closeDialog();
        },
        () => {
          alert('Nie udało się wysłać aplikacji. Spróbuj ponownie.');
        }
      );
  }
}
