import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMessageDialogComponent } from '_@shared/components';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.container.html',
  styleUrl: './messages.container.scss',
})
export class MessagesContainer {
  constructor(private dialog: MatDialog) {}

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
