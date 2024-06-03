import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '_@core/auth.service';
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
  authService = inject(AuthService);

  messages: Message[] = [];
  selectedMessage: Message | null = null;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe((uid) => {
      if (uid) {
        this.messagesService.getMessages(uid).subscribe((messages) => {
          this.messages = messages;
        });
      }
    })
    
  }

  /**
   * Sets the current selected message. This is passed into the 
   * message view component to display the selected message. It is 
   * also passed back into the sidebar container so it can highlight
   * selected message.
   * 
   * @param message 
   */
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
