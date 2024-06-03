import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '_@core/auth.service';
import {
  Message,
  MessagesFirebaseService,
} from '_@core/messagesFirebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrl: './create-message-dialog.component.scss',
})
export class CreateMessageDialogComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();

  authService = inject(AuthService);
  messageForm: FormGroup;
  messagesService = inject(MessagesFirebaseService);

  isEditMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CreateMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message
  ) {
    this.isEditMode = !!data;

    this.messageForm = new FormGroup({
      title: new FormControl(data?.title || '', Validators.required),
      content: new FormControl(data?.content || '', Validators.required),
      delayInMinutes: new FormControl(data?.delayInMinutes || '', [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      if (this.isEditMode) {
        this.editExistingNote();
      } else {
        this.addNewNote();
      }
    }
  }

  addNewNote() {
    const { title, content, delayInMinutes } = this.messageForm.value;
    this.subscription.add(
      this.authService.getCurrentUserId().subscribe((uid) => {
        if (uid) {
          this.messagesService
            .addMessage(uid, title, content, delayInMinutes)
            .subscribe((addedMessageId) => {
              this.dialogRef.close(true);
            });
        }
      })
    );
  }

  editExistingNote() {
    const { title, content, delayInMinutes } = this.messageForm.value;
    if (this.data.id) {
      this.messagesService
        .editMessage(this.data.id, {
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
