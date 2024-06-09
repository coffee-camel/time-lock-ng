import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '_@core/auth.service';
import { EncryptionService } from '_@core/encryption.service';
import {
  Note,
  NotesFirebaseService,
} from '_@core/notesFirebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss',
})
export class NoteDialogComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  noteForm: FormGroup;

  authService = inject(AuthService);
  notesFirebaseService = inject(NotesFirebaseService);
  encryptionService = inject(EncryptionService);

  isEditMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note
  ) {
    this.isEditMode = !!data;

    const content = data?.content
      ? this.encryptionService.decrypt(data.content)
      : '';

    this.noteForm = new FormGroup({
      title: new FormControl(data?.title || '', Validators.required),
      content: new FormControl(content, Validators.required),
      delayInMinutes: new FormControl(data?.delayInMinutes || '', [
        Validators.required,
        Validators.min(0.1),
      ]),
    });
  }

  onSubmit() {
    if (this.noteForm.valid) {
      if (this.isEditMode) {
        this.editExistingNote();
      } else {
        this.addNewNote();
      }
    }
  }

  addNewNote() {
    const { title, content, delayInMinutes } = this.noteForm.value;
    this.subscription.add(
      this.authService.getCurrentUserId().subscribe((uid) => {
        if (uid) {
          this.notesFirebaseService
            .addNote(uid, title, content, delayInMinutes)
            .subscribe((addedNoteId) => {
              this.dialogRef.close(true);
            });
        }
      })
    );
  }

  editExistingNote() {
    const { title, content, delayInMinutes } = this.noteForm.value;
    if (this.data.id) {
      this.notesFirebaseService
        .editNote(this.data.id, {
          title,
          content,
          delayInMinutes,
        })
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
