import { Component, Input } from '@angular/core';
import { Message } from '_@core/messagesFirebase.service';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
})
export class SidebarItemComponent {
  @Input() message!: Message;
}
