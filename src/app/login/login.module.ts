import { NgModule } from '@angular/core';
import { SharedModule } from '../_@shared/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginContainer } from './login.container';
import { LOGIN_ROUTES } from './login.routes';

@NgModule({
  declarations: [LoginContainer],
  imports: [SharedModule, RouterModule.forChild(LOGIN_ROUTES)],
})
export class LoginModule {}
