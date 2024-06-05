import { Component, EventEmitter, Input, Output, OnDestroy, inject } from '@angular/core';
import { EncryptionService } from '_@core/encryption.service';
import { Note } from '_@core/notesFirebase.service';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss'],
})
export class NoteDisplayComponent implements OnDestroy {
  @Output() cancel = new EventEmitter<void>();
  @Output() timerFinished = new EventEmitter<boolean>();

  public encryption: EncryptionService = inject(EncryptionService);
  public isTimerFinished: boolean = false;
  public timerDisplay: string = '';

  private _note: Note | null = null;
  private countdownMilliseconds: number = 0;
  private timerInterval: any;

  @Input()
  set note(value: Note | null) {
    this._note = value;
    this.isTimerFinished = false;
    this.timerFinished.emit(false);

    if (this._note) {
      this.countdownMilliseconds = this._note.delayInMinutes * 60 * 1000;
      this.startCountdown();
    }
  }
  get note(): Note | null {
    return this._note;
  }

  startCountdown(): void {
    this.clearInterval();

    this.timerInterval = setInterval(() => {
      if (this._note) {
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
    this._note = null;
    this.timerDisplay = '';
    this.cancel.emit();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }
}
