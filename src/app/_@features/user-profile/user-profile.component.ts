import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '_@core/auth.service';
import { ConfirmDialogComponent } from '_@shared/components';
import { ConfirmDialogData } from '_@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userEmail: string = '';

  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.authService.getCurrentUserEmail().subscribe((email) => {
      if (email) {
        this.userEmail = email;
      }
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Warning',
        message:
          'Are you sure you want to delete your account? Your data will be permanently deleted.',
        confirmButtonText: 'Yes, delete my account',
        cancelButtonText: 'Cancel',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteAccount();
      }
    });
  }

  deleteAccount(): void {
    this.authService.deleteCurrentUserAccount();
  }
}
