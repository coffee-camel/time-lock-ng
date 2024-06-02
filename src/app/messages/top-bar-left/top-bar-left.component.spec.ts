import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarLeftComponent } from './top-bar-left.component';

describe('TopBarLeftComponent', () => {
  let component: TopBarLeftComponent;
  let fixture: ComponentFixture<TopBarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopBarLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
