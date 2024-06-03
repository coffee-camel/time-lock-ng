import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '_@core/messagesFirebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() messages: Message[] = [];
  @Input() selectedMessage: Message | null = null;
  @Output() messageSelected = new EventEmitter<Message>();

  /**
   * Emits the selected message back to the parent messages container.
   * 
   * @param message 
   */
  selectMessage(message: Message) {
    this.messageSelected.emit(message);
  }

  getFormattedDelay(delayInMinutes: number): string {
    const hours = Math.floor(delayInMinutes / 60);
    const minutes = delayInMinutes % 60;
    return `${hours ? hours + 'h ' : ''}${minutes}m`;
  }
}
