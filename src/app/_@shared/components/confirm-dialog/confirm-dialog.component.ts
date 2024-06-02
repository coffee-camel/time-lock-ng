// confirm-dialog.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: ConfirmDialogData // Removed default parameter
  ) {
    if (!this.data) {
      this.data = getDefaultData(); // Set default data if not provided
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

function getDefaultData(): ConfirmDialogData {
  return {
    title: 'Confirmation',
    message: 'Are you sure?',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  };
}
