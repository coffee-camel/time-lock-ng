import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '_@core/auth.service';
import { MessagesFirebaseService } from '_@core/messagesFirebase.service';
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

  constructor(private dialogRef: MatDialogRef<CreateMessageDialogComponent>) {
    this.messageForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      delayInMinutes: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
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
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
