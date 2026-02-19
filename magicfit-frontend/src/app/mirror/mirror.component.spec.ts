import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorComponent } from './mirror.component';

describe('MirrorComponent', () => {
  let component: MirrorComponent;
  let fixture: ComponentFixture<MirrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MirrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MirrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
