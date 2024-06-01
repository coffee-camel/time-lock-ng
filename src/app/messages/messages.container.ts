import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Message, MessagesFirebaseService } from '_@core/messagesFirebase.service';
import { CreateMessageDialogComponent } from '_@shared/components';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.container.html',
  styleUrl: './messages.container.scss',
})
export class MessagesContainer implements OnInit {
  messages: Message[] = [];
  messagesService = inject(MessagesFirebaseService);

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe((messages) => {
      this.messages = messages;
    })
  }

  onMessageClick(message: Message) {
    this.router.navigate(['/messages', message.id]);
  }

  openCreateMessageDialog() {
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
}
