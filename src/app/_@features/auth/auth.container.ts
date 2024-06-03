import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '_@core/auth.service';

@Component({
  templateUrl: './auth.container.html',
  styleUrl: './auth.container.scss',
})
export class AuthContainer {
  authMethodIndex: number = 0; // 0: login, 1: signup, 2: link
  emailForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: [''],
    });
  }

  ngOnInit(): void {
    this.authService.checkSignInLink();
  }

  async onSendLink() {
    const { email } = this.emailForm.value;
    await this.authService.sendSignInLink(email);
  }
}
