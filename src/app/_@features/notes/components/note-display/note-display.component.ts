import { Component, EventEmitter, Input, Output, OnDestroy, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  private worker: Worker;

  constructor(private titleService: Title) {
    this.worker = new Worker(new URL('./timer.worker', import.meta.url));
    this.worker.onmessage = ({ data }) => this.handleWorkerMessage(data);
  }

  ngOnDestroy(): void {
    this.worker.terminate();
    this.setTitle('TimeLock');
  }

  @Input()
  set note(value: Note | null) {
    if (value !== this._note) {
      this._note = value;
      this.isTimerFinished = false;
      this.timerFinished.emit(false);

      if (this._note) {
        const countdownMilliseconds = this._note.delayInMinutes * 60 * 1000;
        this.worker.postMessage({ action: 'start', countdownMilliseconds });
      } else {
        this.worker.postMessage({ action: 'stop' });
      }
    }
  }
  get note(): Note | null {
    return this._note;
  }

  private handleWorkerMessage(data: any): void {
    if (data.action === 'tick') {
      const minutes = Math.floor(data.countdownMilliseconds / 60000);
      const seconds = ((data.countdownMilliseconds % 60000) / 1000).toFixed(0);
      this.timerDisplay = `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
      this.setTitle(`${this.timerDisplay} | TimeLock`);
    } else if (data.action === 'finished') {
      this.timerDisplay = '';
      this.isTimerFinished = true;
      this.timerFinished.emit(true);
      this.setTitle('TimeLock');
    }
  }

  private setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  onCancel(): void {
    this._note = null;
    this.timerDisplay = '';
    this.cancel.emit();
    this.worker.postMessage({ action: 'stop' }); // Send stop signal to Web Worker
    this.setTitle('TimeLock');
  }
}