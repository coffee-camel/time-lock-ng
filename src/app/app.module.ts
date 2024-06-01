import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SharedModule } from './_@shared/shared.module';

import { APP_ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(APP_ROUTES, {
      enableTracing: false,
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
  }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({"projectId":"timelock-b6fa1","appId":"1:772583398496:web:ac9d6c3fc192f8be3df705","storageBucket":"timelock-b6fa1.appspot.com","apiKey":"AIzaSyARYrmgK3wssim_BNCfjbVgn1MLLKcDUwE","authDomain":"timelock-b6fa1.firebaseapp.com","messagingSenderId":"772583398496","measurementId":"G-072LET2D1W"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
