import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOfferService } from '../../services/job-offer.service';
import { ApplicationService } from '../../services/application.service';
import { MessageService } from 'primeng/api';

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
  showDialog: boolean = false;
  isPdfFile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobOfferService: JobOfferService,
    private applicationService: ApplicationService,
    private messageService: MessageService
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
    const file: File = event.target.files[0];
    if (file && file.name.endsWith('.pdf')) {
      this.selectedFile = file;
      this.isPdfFile = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Błąd',
        detail: 'Proszę wybrać plik CV (PDF)'
      });
      this.selectedFile = null;
      this.isPdfFile = false;
    }
  }

  onApply(): void {
    if (!this.selectedFile || !this.isPdfFile) {
      return; // Dodatkowe zabezpieczenie
    }

    const formData = new FormData();
    formData.append('cvFile', this.selectedFile);

    this.applicationService
      .applyToJobOffer(this.jobOffer.id, formData)
      .subscribe(
        {
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sukces',
              detail: 'Aplikacja została pomyślnie wysłana!',
            });
            this.closeDialog();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Błąd',
              detail: 'Nie udało się wysłać aplikacji. Spróbuj ponownie.'
            });
          }

        }

      );
  }

}
