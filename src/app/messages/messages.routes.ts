import { MessageComponent } from './message/message.component';
import { MessagesContainer } from './messages.container';

export const MESSAGES_ROUTES = [
  { path: '', component: MessagesContainer },
  {
    path: ':id',
    component: MessageComponent,
  },
];
