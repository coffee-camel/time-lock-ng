import { Component, Optional } from '@angular/core';
import {
  Auth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html',
  styleUrl: './login.container.scss',
})
export class LoginContainer {
  email: string = '';

  constructor(@Optional() private auth: Auth) {}

  ngOnInit(): void {
    this.checkSignInLink();
  }

  async sendSignInLink() {
    const actionCodeSettings = {
      url: 'http://localhost:4200', // Update with your app's URL
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(this.auth, this.email, actionCodeSettings)
      .then(() => {
        alert(`Sign in link was sent to ${this.email}`);
        window.localStorage.setItem('emailForSignIn', this.email);
        // ...
      })
      .catch((error) => {
        alert(error);
      });
  }

  async checkSignInLink() {
    if (isSignInWithEmailLink(this.auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      console.log('email from localstorage: ', email);
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
        return;
      }
      signInWithEmailLink(this.auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          alert('Successfully signed in!');
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
}
