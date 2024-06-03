import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesContainer } from './notes.container';

describe('NotesContainer', () => {
  let component: NotesContainer;
  let fixture: ComponentFixture<NotesContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesContainer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
