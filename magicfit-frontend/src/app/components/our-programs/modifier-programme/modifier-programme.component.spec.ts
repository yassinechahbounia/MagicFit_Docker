import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProgrammeComponent } from './modifier-programme.component';

describe('ModifierProgrammeComponent', () => {
  let component: ModifierProgrammeComponent;
  let fixture: ComponentFixture<ModifierProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierProgrammeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
