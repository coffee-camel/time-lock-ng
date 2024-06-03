import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageDisplayComponent } from './components/message-display/message-display.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NotesContainer } from './notes.container';
import { NOTES_ROUTES } from './notes.routes';
import { SharedModule } from '_@shared/shared.module';

@NgModule({
  declarations: [
    NotesContainer,
    SidebarComponent,
    MessageDisplayComponent,
    TopBarComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(NOTES_ROUTES)],
})
export class NotesModule {}
