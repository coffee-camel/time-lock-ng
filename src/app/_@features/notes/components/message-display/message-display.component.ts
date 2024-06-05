import { Component, EventEmitter, Input, Output, OnDestroy, inject } from '@angular/core';
import { EncryptionService } from '_@core/encryption.service';
import { Message } from '_@core/messagesFirebase.service';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.scss'],
})
export class MessageDisplayComponent implements OnDestroy {
  @Output() cancel = new EventEmitter<void>();
  @Output() timerFinished = new EventEmitter<boolean>();

  public encryption: EncryptionService = inject(EncryptionService);
  public isTimerFinished: boolean = false;
  public timerDisplay: string = '';

  private _message: Message | null = null;
  private countdownMilliseconds: number = 0;
  private timerInterval: any;

  @Input()
  set message(value: Message | null) {
    this._message = value;
    this.isTimerFinished = false;
    this.timerFinished.emit(false);

    if (this._message) {
      this.countdownMilliseconds = this._message.delayInMinutes * 60 * 1000;
      this.startCountdown();
    }
  }
  get message(): Message | null {
    return this._message;
  }

  startCountdown(): void {
    this.clearInterval();

    this.timerInterval = setInterval(() => {
      if (this._message) {
        const minutes = Math.floor(this.countdownMilliseconds / 60000);
        const seconds = ((this.countdownMilliseconds % 60000) / 1000).toFixed(0);

        this.timerDisplay = `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
        this.countdownMilliseconds -= 1000;

        if (this.countdownMilliseconds < 0) {
          this.clearInterval();
          this.timerDisplay = '';
          this.isTimerFinished = true;
          this.timerFinished.emit(true);
        }
      } else {
        this.clearInterval();
      }
    }, 1000);
  }

  clearInterval(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  onCancel(): void {
    this._message = null;
    this.timerDisplay = '';
    this.cancel.emit();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }
}
