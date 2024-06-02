import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  Message,
  MessagesFirebaseService,
} from '_@core/messagesFirebase.service';
import {
  ConfirmDialogComponent,
  CreateMessageDialogComponent,
} from '_@shared/components';
import { ConfirmDialogData } from '_@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.container.html',
  styleUrl: './messages.container.scss',
})
export class MessagesContainer implements OnInit {
  messagesService = inject(MessagesFirebaseService);

  messages: Message[] = [];
  selectedMessage: Message | null = null;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  onMessageSelected(message: Message) {
    this.selectedMessage = message;
  }

  onCreateNote() {
    const dialogRef = this.dialog.open(CreateMessageDialogComponent, {
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

  onDeleteNote() {
    if (this.selectedMessage) {
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
          this.messagesService
            .removeMessage(this.selectedMessage?.id)
            .subscribe(() => {
              this.selectedMessage = null;
            });
        }
      });
    }
  }
}
