import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-bar-right',
  templateUrl: './top-bar-right.component.html',
  styleUrls: ['./top-bar-right.component.scss'],
})
export class TopBarRightComponent {
  @Output() create = new EventEmitter<void>();

  createNote() {
    this.create.emit();
  }
}
