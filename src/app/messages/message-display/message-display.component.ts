import { Component, Input } from '@angular/core';
import { Message } from '_@core/messagesFirebase.service';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrl: './message-display.component.scss',
})
export class MessageDisplayComponent {
  @Input() message: Message | null = null;
}
