import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationApartmentsProxyComponent } from './integration-apartments-proxy.component';

describe('IntegrationApartmentsProxyComponent', () => {
  let component: IntegrationApartmentsProxyComponent;
  let fixture: ComponentFixture<IntegrationApartmentsProxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationApartmentsProxyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationApartmentsProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
