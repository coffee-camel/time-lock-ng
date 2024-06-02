import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarRightComponent } from './top-bar-right.component';

describe('TopBarRightComponent', () => {
  let component: TopBarRightComponent;
  let fixture: ComponentFixture<TopBarRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopBarRightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
