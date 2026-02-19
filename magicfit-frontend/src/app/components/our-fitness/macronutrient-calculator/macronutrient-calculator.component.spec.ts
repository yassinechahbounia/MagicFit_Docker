import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacronutrientCalculatorComponent } from './macronutrient-calculator.component';

describe('MacronutrientCalculatorComponent', () => {
  let component: MacronutrientCalculatorComponent;
  let fixture: ComponentFixture<MacronutrientCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacronutrientCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacronutrientCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
