import { Component } from '@angular/core';
import { AuthService } from '_@core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html',
  styleUrl: './login.container.scss',
})
export class LoginContainer {
  email: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkSignInLink();
  }

  async sendSignInLink() {
    await this.authService.sendSignInLink(this.email);
  }
}
