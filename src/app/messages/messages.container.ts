import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '_@core/message.service';
import { CreateMessageDialogComponent } from '_@shared/components';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.container.html',
  styleUrl: './messages.container.scss',
})
export class MessagesContainer {
  messages: Message[] = [
    { title: 'Note 1', content: 'some content note 1', delayInMinutes: 1 },
    { title: 'Note 2', content: 'some content note 2', delayInMinutes: 1 },
    { title: 'Note 3', content: 'some content note 3', delayInMinutes: 1 },
    { title: 'Note 3', content: 'some content note 4', delayInMinutes: 1 },
  ];

  constructor(private dialog: MatDialog) {}

  onMessageClick(message: Message) {
    alert(`You clicked on ${message.title}`);
  }

  openCreateMessageDialog() {
    const dialogRef = this.dialog.open(CreateMessageDialogComponent, {
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Message created successfully');
        // Handle success
      } else {
        console.log('Message creation canceled or failed');
        // Handle cancel or failure
      }
    });
  }
}
