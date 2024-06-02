import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '_@core/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {

  constructor(private router: Router, private authService: AuthService) {}

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  async logout() {
    await this.authService.logout();
  }
}
