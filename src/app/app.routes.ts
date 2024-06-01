import { Route } from '@angular/router';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToSendEmail = () => redirectLoggedInTo(['messages']);

export const APP_ROUTES: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToSendEmail },
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];
