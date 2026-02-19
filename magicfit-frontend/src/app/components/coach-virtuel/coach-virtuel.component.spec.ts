import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachVirtuelComponent } from './coach-virtuel.component';

describe('CoachVirtuelComponent', () => {
  let component: CoachVirtuelComponent;
  let fixture: ComponentFixture<CoachVirtuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachVirtuelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachVirtuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
