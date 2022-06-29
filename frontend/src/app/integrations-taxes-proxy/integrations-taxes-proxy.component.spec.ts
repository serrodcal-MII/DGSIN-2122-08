import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsTaxesProxyComponent } from './integrations-taxes-proxy.component';

describe('IntegrationsTaxesProxyComponent', () => {
  let component: IntegrationsTaxesProxyComponent;
  let fixture: ComponentFixture<IntegrationsTaxesProxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationsTaxesProxyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationsTaxesProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
