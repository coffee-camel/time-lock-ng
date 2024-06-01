import { Component } from '@angular/core';
import { AuthService } from '_@core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  async logout() {
    await this.authService.logout();
  }
}
