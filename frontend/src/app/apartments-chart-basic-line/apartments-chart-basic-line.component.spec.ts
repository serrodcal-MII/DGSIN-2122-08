import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsChartBasicLineComponent } from './apartments-chart-basic-line.component';

describe('ApartmentsChartBasicLineComponent', () => {
  let component: ApartmentsChartBasicLineComponent;
  let fixture: ComponentFixture<ApartmentsChartBasicLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentsChartBasicLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsChartBasicLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
