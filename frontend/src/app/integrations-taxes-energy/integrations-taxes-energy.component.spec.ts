import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsTaxesEnergyComponent } from './integrations-taxes-energy.component';

describe('IntegrationsTaxesEnergyComponent', () => {
  let component: IntegrationsTaxesEnergyComponent;
  let fixture: ComponentFixture<IntegrationsTaxesEnergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationsTaxesEnergyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationsTaxesEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
