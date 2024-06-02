import { Component, Input } from '@angular/core';
import { Message } from '_@core/messagesFirebase.service';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrl: './message-display.component.scss',
})
export class MessageDisplayComponent {
  private _message: Message | null = null;

  @Input()
  set message(value: Message | null) {
    this._message = value;
    this.timerFinished = false;
    if (this._message) {
      this.countdownMilliseconds = this._message.delayInMinutes * 60 * 1000;
      this.startCountdown();
    }
  }
  get message(): Message | null {
    return this._message;
  }

  timerFinished: boolean = false;
  countdownMilliseconds: number = 0;
  timerDisplay: string = '';
  private timerInterval: any;

  startCountdown(): void {
    // Clear any existing interval
    this.clearInterval();

    // Start a new interval
    this.timerInterval = setInterval(() => {
      if (this._message) {
        const minutes = Math.floor(this.countdownMilliseconds / 60000);
        const seconds = ((this.countdownMilliseconds % 60000) / 1000).toFixed(
          0
        );

        this.timerDisplay = `${minutes}:${
          Number(seconds) < 10 ? '0' : ''
        }${seconds}`;
        this.countdownMilliseconds -= 1000;

        if (this.countdownMilliseconds < 0) {
          this.clearInterval(); // Clear interval when countdown finishes
          this.timerDisplay = '0:00';
          this.timerFinished = true;
        }
      } else {
        this.clearInterval(); // Clear interval if message is null or undefined
      }
    }, 1000);
  }

  clearInterval(): void {
    // Clear any existing interval
    clearInterval(this.timerInterval);
  }
}
