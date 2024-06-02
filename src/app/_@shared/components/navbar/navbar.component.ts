import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '_@core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user) => (this.isLoggedIn = !!user));
  }
}
