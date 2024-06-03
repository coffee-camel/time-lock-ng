import { NgModule } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SharedModule } from '_@shared/shared.module';
import { AuthContainer } from './auth.container';
import { AUTH_ROUTES } from './auth.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthContainer, LoginFormComponent, SignUpFormComponent],
  imports: [SharedModule, RouterModule.forChild(AUTH_ROUTES)],
})
export class AuthModule {}
