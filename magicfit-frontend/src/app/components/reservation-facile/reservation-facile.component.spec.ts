import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFacileComponent } from './reservation-facile.component';

describe('ReservationFacileComponent', () => {
  let component: ReservationFacileComponent;
  let fixture: ComponentFixture<ReservationFacileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationFacileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFacileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
