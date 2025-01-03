import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobOfferService } from '../../services/job-offer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})
export class ListOffersComponent implements OnInit {
  jobOffers: any[] = [];
  filteredJobOffers: any[] = [];
  searchTerm: string = '';
  isCompany: boolean = false;

  constructor(
    private jobOfferService: JobOfferService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadJobOffers();
    this.checkUserType();
  }

  private loadJobOffers(): void {
    this.jobOfferService.getJobOffers().subscribe((data) => {
      this.jobOffers = data;
      this.filteredJobOffers = this.jobOffers;
    });
  }

  private checkUserType(): void {
    this.isCompany = this.authService.isCompany();
  }

  onSearch(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredJobOffers = this.jobOffers.filter((offer) =>
      offer.title.toLowerCase().includes(searchTermLower)
    );
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['/offers', id]);
  }

  navigateToCreateOffer(): void {
    if (this.isCompany) {
      this.router.navigate(['/offers/new']);
    }
  }
}
