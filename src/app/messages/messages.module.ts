import { NgModule } from '@angular/core';
import { SharedModule } from '../_@shared/shared/shared.module';
import { MessagesContainer } from './messages.container';
import { RouterModule } from '@angular/router';
import { MESSAGES_ROUTES } from './messages.routes';

@NgModule({
  declarations: [MessagesContainer],
  imports: [SharedModule, RouterModule.forChild(MESSAGES_ROUTES)],
})
export class MessagesModule {}
