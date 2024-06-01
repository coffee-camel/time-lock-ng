import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessagesFirebaseService } from '_@core/messagesFirebase.service';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrl: './create-message-dialog.component.scss',
})
export class CreateMessageDialogComponent {
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

  ngOnInit(): void {}

  onSubmit() {
    if (this.messageForm.valid) {
      const { title, content, delayInMinutes } = this.messageForm.value;
      this.messagesService
        .addMessage(title, content, delayInMinutes)
        .subscribe((addedMessageId) => {
          this.dialogRef.close(true);
        });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
