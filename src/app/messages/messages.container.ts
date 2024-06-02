import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  Message,
  MessagesFirebaseService,
} from '_@core/messagesFirebase.service';
import { CreateMessageDialogComponent } from '_@shared/components';

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
    // Logic to create a new note
    const newMessage: Message = {
      id: (this.messages.length + 1).toString(),
      title: 'New Message',
      content: 'This is a new message.',
      delayInMinutes: 5
    };
    this.messages.push(newMessage);
  }

  onDeleteNote() {
    if (this.selectedMessage) {
      this.messages = this.messages.filter(m => m.id !== this.selectedMessage!.id);
      this.selectedMessage = null;
    }
  }

  // openCreateMessageDialog() {
  //   const dialogRef = this.dialog.open(CreateMessageDialogComponent, {
  //     width: '400px',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       console.log('Message created successfully');
  //     } else {
  //       console.log('Message creation canceled or failed');
  //     }
  //   });
  // }
}
