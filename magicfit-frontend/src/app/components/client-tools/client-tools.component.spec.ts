import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientToolsComponent } from './client-tools.component';

describe('ClientToolsComponent', () => {
  let component: ClientToolsComponent;
  let fixture: ComponentFixture<ClientToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
