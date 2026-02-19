import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerExerciceComponent } from './supprimer-exercice.component';

describe('SupprimerExerciceComponent', () => {
  let component: SupprimerExerciceComponent;
  let fixture: ComponentFixture<SupprimerExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupprimerExerciceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
