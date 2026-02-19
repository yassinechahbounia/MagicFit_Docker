import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerProgrammeComponent } from './supprimer-programme.component';

describe('SupprimerProgrammeComponent', () => {
  let component: SupprimerProgrammeComponent;
  let fixture: ComponentFixture<SupprimerProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupprimerProgrammeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
