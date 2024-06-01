import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '_@core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authMethodIndex: number = 0; // 0: login, 1: signup, 2: link
  loginForm: FormGroup;
  signupForm: FormGroup;
  emailForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.signupForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.emailForm = this.fb.group({
      email: ['']
    });
  }

  ngOnInit(): void {
    this.authService.checkSignInLink();
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    await this.authService.loginWithEmailPassword(email, password);
  }

  async onSignup() {
    const { email, password } = this.signupForm.value;
    await this.authService.signUpWithEmailPassword(email, password);
  }

  async onSendLink() {
    const { email } = this.emailForm.value;
    await this.authService.sendSignInLink(email);
  }
}
