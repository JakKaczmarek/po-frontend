import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobOfferService } from '../../services/job-offer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent {
  offer = {
    title: '',
    companyName: '',
    description: '',
    location: '',
    salary: null,
  };

  constructor(private jobOfferService: JobOfferService, private router: Router, private messageService: MessageService) { }

  onSubmit(): void {
    this.jobOfferService.createJobOffer(this.offer).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Oferta została pomyślnie dodana!',
        });
        this.router.navigate(['/offers']);
      },
      error: (err) => {
        console.error('Błąd podczas dodawania oferty:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd logowania',
          detail: 'Nie udało się dodać oferty. Spróbuj ponownie.',
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/offers']);
  }
}
