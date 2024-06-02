import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '_@core/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  signupForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  async onSignup() {
    const { email, password } = this.signupForm.value;
    await this.authService.signUpWithEmailPassword(email, password);
  }
}
