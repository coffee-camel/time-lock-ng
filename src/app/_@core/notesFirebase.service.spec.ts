import { TestBed } from '@angular/core/testing';

import { NotesFirebaseService } from './notesFirebase.service';

describe('NotesFirebaseService', () => {
  let service: NotesFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
