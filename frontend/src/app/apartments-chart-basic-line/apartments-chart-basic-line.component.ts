import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../apartment.service';
import * as Highcharts from 'highcharts';
import { Apartment } from '../apartment';

@Component({
  selector: 'app-apartments-chart-basic-line',
  templateUrl: './apartments-chart-basic-line.component.html',
  styleUrls: ['./apartments-chart-basic-line.component.css']
})
export class ApartmentsChartBasicLineComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(private apartmentService: ApartmentService) { }

  ngOnInit(): void {

    this.apartmentService.getApartments().subscribe(
      (apartments) => {

        var maxYear = this.getMaxYear(apartments);
        var minYear = this.getMinYear(apartments);

        this.chartOptions = {
          title: {
            text: `Tourist Apartments Statistics by Country ${minYear}-${maxYear}`
          },
          series: this.getTravellers(apartments),
        };
      }
    );
  }

  getMaxYear(apartments: Apartment[]): number {
    var maxYear = apartments[0].year;
    apartments.forEach(i => {
      if (i.year > maxYear)
        maxYear = i.year;
    })
    return maxYear;
  }
  
  getMinYear(apartments: Apartment[]): number {
    var minYear = apartments[0].year;
    apartments.forEach(i => {
      if (i.year < minYear)
        minYear = i.year;
    })
    return minYear;
  }

  getTravellers(apartments: Apartment[]): Highcharts.SeriesOptionsType[] {
    var series = [];
    var countries = new Set<string>(apartments.map(i => i.country));

    countries.forEach(c => {
      var data = apartments.filter(i => i.country === c).map(i => i.travellers);
      series.push({
        name: c,
        data: data,
        type: 'line'
      });
    });

    return series;
  }

}
