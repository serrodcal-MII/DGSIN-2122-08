import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsChartBasicPieComponent } from './apartments-chart-basic-pie.component';

describe('ApartmentsChartBasicPieComponent', () => {
  let component: ApartmentsChartBasicPieComponent;
  let fixture: ComponentFixture<ApartmentsChartBasicPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentsChartBasicPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsChartBasicPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
