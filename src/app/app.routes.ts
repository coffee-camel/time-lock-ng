import { Route } from '@angular/router';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { AboutComponent } from './about/about.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToSendEmail = () => redirectLoggedInTo(['notes']);

export const APP_ROUTES: Route[] = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./_@features/auth/auth.module').then((m) => m.AuthModule),
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
