import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Apartment } from '../apartment';
import { ApartmentService } from '../apartment.service';

@Component({
  selector: 'app-apartments-chart-basic-pie',
  templateUrl: './apartments-chart-basic-pie.component.html',
  styleUrls: ['./apartments-chart-basic-pie.component.css']
})
export class ApartmentsChartBasicPieComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(private apartmentService: ApartmentService) { }

  ngOnInit(): void {
    this.apartmentService.getApartments().subscribe(
      (apartments) => {

        var data = this.getTravellers(apartments);

        var maxYear = this.getMaxYear(apartments);
        var minYear = this.getMinYear(apartments);

        this.chartOptions = {
          title: {
            text: `Pie chart of Tourist Apartments Statictics ${minYear}-${maxYear}`
          },
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
            point: {
                valueSuffix: '%'
            }
          },
          plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
          },
          series: [
            {
              name: 'Tourists by country',
              type:undefined,
              colorByPoint: true,
              data: data
            }
          ]

        }

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
    var data = [];
    var countries = new Set<string>(apartments.map(i => i.country));

    var statsByCountry = {};

    countries.forEach(c => {
      var travellers = apartments.filter(i => i.country === c).map(i => i.travellers); //filter by country
      data.push({
        name: c,
        y: travellers.reduce(function (a,b){ return a + b; }) //sum by country
      });
    });


    var total = 0;
    data.forEach(i => { //get total
      total += i.y;
    });

    data.forEach(i => { //calculate percentage
      i.y = i.y / total;
    });

    return data;
  }


}
