import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '_@core/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  message: Message = {
    title: 'my note',
    content: 'my content',
    delayInMinutes: 1
  };

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const messageId = params['id'];
      console.log('messageId: ', messageId)
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
