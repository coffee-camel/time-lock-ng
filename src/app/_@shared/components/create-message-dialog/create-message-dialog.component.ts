import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '_@core/message.service';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrl: './create-message-dialog.component.scss',
})
export class CreateMessageDialogComponent {
  messageForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateMessageDialogComponent>,
    private messageService: MessageService
  ) {
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
      this.messageService
        .createMessage(title, content, delayInMinutes)
        .then(() => {
          this.dialogRef.close(true); // Close dialog with success flag
        })
        .catch((error) => {
          console.error('Error creating message:', error);
          // Handle error here
        });
    }
  }

  onCancel() {
    this.dialogRef.close(false); // Close dialog without submitting
  }
}
