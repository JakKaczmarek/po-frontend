import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isCompany: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkUserType();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToUserOffers(): void {
    this.router.navigate(['/user-offers']);
  }

  navigateToGeneralScreen(): void {
    this.router.navigate(['/offers']);

  }

  private checkUserType(): void {
    this.isCompany = this.authService.isCompany();
  }
}
