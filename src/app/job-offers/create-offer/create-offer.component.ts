import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobOfferService } from '../../services/job-offer.service';

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

  constructor(private jobOfferService: JobOfferService, private router: Router) { }

  onSubmit(): void {
    this.jobOfferService.createJobOffer(this.offer).subscribe({
      next: () => {
        alert('Oferta została pomyślnie dodana!');
        this.router.navigate(['/offers']);
      },
      error: (err) => {
        console.error('Błąd podczas dodawania oferty:', err);
        alert('Nie udało się dodać oferty. Spróbuj ponownie.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/offers']);
  }
}
