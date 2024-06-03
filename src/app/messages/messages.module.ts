import { NgModule } from '@angular/core';
import { SharedModule } from '../_@shared/shared.module';
import { MessagesContainer } from './messages.container';
import { RouterModule } from '@angular/router';
import { MESSAGES_ROUTES } from './messages.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MessageDisplayComponent } from './message-display/message-display.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
    MessagesContainer,
    SidebarComponent,
    MessageDisplayComponent,
    TopBarComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(MESSAGES_ROUTES)],
})
export class MessagesModule {}
