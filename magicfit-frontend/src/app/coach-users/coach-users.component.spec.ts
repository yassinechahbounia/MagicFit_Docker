import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachUsersComponent } from './coach-users.component';

describe('CoachUsersComponent', () => {
  let component: CoachUsersComponent;
  let fixture: ComponentFixture<CoachUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
