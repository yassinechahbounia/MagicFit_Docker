import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProgrammeComponent } from './assign-programme.component';

describe('AssignProgrammeComponent', () => {
  let component: AssignProgrammeComponent;
  let fixture: ComponentFixture<AssignProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignProgrammeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
