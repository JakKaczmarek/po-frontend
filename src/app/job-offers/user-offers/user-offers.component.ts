import { Component, OnInit } from '@angular/core';
import { JobOfferService } from '../../services/job-offer.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.scss']
})
export class UserOffersComponent implements OnInit {
  userOffers: any[] = [];
  isCompany: boolean = false;

  constructor(
    private jobOfferService: JobOfferService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkUserType();
    if (this.isCompany) {
      this.loadUserOffers();
    }
  }
  navigateToApplications(offerId: number): void {
    this.router.navigate(['/offers', offerId, 'applications']);
  }
  private loadUserOffers(): void {
    this.jobOfferService.getUserJobOffers().subscribe((data) => {
      this.userOffers = data;
    });
  }

  private checkUserType(): void {
    this.isCompany = this.authService.isCompany();
  }
}
