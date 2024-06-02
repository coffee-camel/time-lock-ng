import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Message } from '_@core/messagesFirebase.service';

@Component({
  selector: 'app-top-bar-left',
  templateUrl: './top-bar-left.component.html',
  styleUrls: ['./top-bar-left.component.scss'],
})
export class TopBarLeftComponent {
  @Output() delete = new EventEmitter<void>();
  @Input() selectedMessage: Message | null = null;

  deleteNote() {
    this.delete.emit();
  }
}
