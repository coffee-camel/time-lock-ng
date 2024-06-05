import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '_@core/notesFirebase.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  @Output() create = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Input() selectedNote: Note | null = null;
  @Input() timerFinished: boolean = false;

  createNote() {
    this.create.emit();
  }

  deleteNote() {
    this.delete.emit();
  }

  editNote() {
    this.edit.emit();
  }
}
