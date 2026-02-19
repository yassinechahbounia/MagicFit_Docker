import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSettingToolComponent } from './goal-setting-tool.component';

describe('GoalSettingToolComponent', () => {
  let component: GoalSettingToolComponent;
  let fixture: ComponentFixture<GoalSettingToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalSettingToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalSettingToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
