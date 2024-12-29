import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Ukryj navbar na stronach logowania i rejestracji
      const currentRoute = this.router.url;
      this.showNavbar = !(currentRoute === '/login' || currentRoute === '/register');
    });
  }
}
