import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationApartmentsNoProxyComponent } from './integration-apartments-no-proxy.component';

describe('IntegrationApartmentsNoProxyComponent', () => {
  let component: IntegrationApartmentsNoProxyComponent;
  let fixture: ComponentFixture<IntegrationApartmentsNoProxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationApartmentsNoProxyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationApartmentsNoProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
