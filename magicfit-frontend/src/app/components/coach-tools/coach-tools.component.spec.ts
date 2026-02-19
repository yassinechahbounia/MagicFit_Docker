import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachToolsComponent } from './coach-tools.component';

describe('CoachToolsComponent', () => {
  let component: CoachToolsComponent;
  let fixture: ComponentFixture<CoachToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
