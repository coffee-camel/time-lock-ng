import { Component } from '@angular/core';
import { getAuth, sendSignInLinkToEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html',
  styleUrl: './login.container.scss',
})
export class LoginContainer {
  email: string = '';

  constructor() {}

  async sendSignInLink() {
    const auth = getAuth();
    const actionCodeSettings = {
      url: 'http://localhost:4200', // Update with your app's URL
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, this.email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', this.email);
      alert('A sign-in link has been sent to your email.');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending the email.');
    }
  }
}
