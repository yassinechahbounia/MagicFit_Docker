import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurFitnessComponent } from './our-fitness.component';

describe('OurFitnessComponent', () => {
  let component: OurFitnessComponent;
  let fixture: ComponentFixture<OurFitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurFitnessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurFitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
