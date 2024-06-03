import { Route } from '@angular/router';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToSendEmail = () => redirectLoggedInTo(['messages']);

export const APP_ROUTES: Route[] = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToSendEmail },
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('./_@features/notes/notes.module').then((m) => m.NotesModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
