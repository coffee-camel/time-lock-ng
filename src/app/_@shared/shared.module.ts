import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { COMPONENT_DECLARATIONS } from './components';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@NgModule({
  declarations: [
    ...COMPONENT_DECLARATIONS,
    ConfirmDialogComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ...COMPONENT_DECLARATIONS,
  ],
})
export class SharedModule {}
