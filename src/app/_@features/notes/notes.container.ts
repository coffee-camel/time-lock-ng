import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '_@core/auth.service';
import {
  Note,
  NotesFirebaseService,
} from '_@core/notesFirebase.service';
import {
  ConfirmDialogComponent,
  NoteDialogComponent,
} from '_@shared/components';
import { ConfirmDialogData } from '_@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  templateUrl: './notes.container.html',
  styleUrl: './notes.container.scss',
})
export class NotesContainer implements OnInit {
  notesFirebaseService = inject(NotesFirebaseService);
  authService = inject(AuthService);

  notes: Note[] = [];
  selectedNote: Note | null = null;

  public state: any = {
    model: {},
    status: {
      isTimerFinished: false,
    },
  };

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe((uid) => {
      if (uid) {
        this.notesFirebaseService.getNotes(uid).subscribe((notes) => {
          this.notes = notes;
        });
      }
    });
  }

  /**
   * Sets the current selected message. This is passed into the
   * message view component to display the selected message. It is
   * also passed back into the sidebar container so it can highlight
   * selected message.
   *
   * @param message
   */
  onNoteSelected(note: Note) {
    this.selectedNote = note;
  }

  onCreateNote() {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Message created successfully');
      } else {
        console.log('Message creation canceled or failed');
      }
    });
  }

  onEditNote() {
    if (this.selectedNote) {
      const dialogRef = this.dialog.open(NoteDialogComponent, {
        width: '400px',
        data: this.selectedNote,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Message edited successfully');
        } else {
          console.log('Message edit canceled or failed');
        }
      });
    }
  }

  onDeleteNote() {
    if (this.selectedNote) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          title: 'Confirmation',
          message: 'Are you sure you want to delete this item?',
          confirmButtonText: 'Yes, delete',
          cancelButtonText: 'Cancel',
        } as ConfirmDialogData,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.notesFirebaseService
            .removeNote(this.selectedNote?.id)
            .subscribe(() => {
              this.selectedNote = null;
            });
        }
      });
    }
  }

  onTimerFinished(isTimerFinished: boolean) {
    this.state.status.isTimerFinished = isTimerFinished;
  }

  onCancel() {
    this.selectedNote = null;
  }
}
