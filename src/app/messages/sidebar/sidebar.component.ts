import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '_@core/messagesFirebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() messages: Message[] = [];
  @Output() messageSelected = new EventEmitter<Message>();

  selectMessage(message: Message) {
    this.messageSelected.emit(message);
  }
}
