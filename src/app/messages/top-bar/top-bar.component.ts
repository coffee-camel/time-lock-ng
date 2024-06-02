import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '_@core/messagesFirebase.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  @Output() create = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  // @Output() search = new EventEmitter<string>();
  @Input() selectedMessage: Message | null = null;

  createNote() {
    this.create.emit();
  }

  deleteNote() {
    this.delete.emit();
  }

  // onSearch(query: string) {
  //   this.search.emit(query);
  // }
}
