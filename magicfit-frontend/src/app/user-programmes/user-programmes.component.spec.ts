import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgrammesComponent } from './user-programmes.component';

describe('UserProgrammesComponent', () => {
  let component: UserProgrammesComponent;
  let fixture: ComponentFixture<UserProgrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProgrammesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
