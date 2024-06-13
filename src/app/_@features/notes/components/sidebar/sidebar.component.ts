import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '_@core/notesFirebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() notes: Note[] = [];
  @Input() selectedNote: Note | null = null;
  @Output() noteSelected = new EventEmitter<Note>();

  /**
   * Emits the selected note back to the parent notes container.
   * 
   * @param message 
   */
  selectNote(note: Note) {
    this.noteSelected.emit(note);
  }

  getFormattedDelay(delayInMinutes: number): string {
    const hours = Math.floor(delayInMinutes / 60);
    const minutes = delayInMinutes % 60;
    return `${hours ? hours + 'h ' : ''}${minutes}m`;
  }
}
