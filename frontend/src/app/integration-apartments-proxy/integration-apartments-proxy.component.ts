import { Component, OnInit } from '@angular/core';
import { ChartType, ScriptLoaderService } from 'angular-google-charts';
import { forkJoin } from 'rxjs';
import { Apartment } from '../apartment';
import { ApartmentService } from '../apartment.service';
import { Wage } from '../wage';

@Component({
  selector: 'app-integration-apartments-proxy',
  templateUrl: './integration-apartments-proxy.component.html',
  styleUrls: ['./integration-apartments-proxy.component.css']
})
export class IntegrationApartmentsProxyComponent implements OnInit {

  selectedYear: Number;
  years;

  apartments: Apartment[];
  wages: Wage[];

  constructor(private apartmentService: ApartmentService, private loaderService: ScriptLoaderService) { }

  ngOnInit(): void {
    forkJoin([
      this.apartmentService.getApartments(),
      this.apartmentService.getWages()
    ]).subscribe(
      (result) => {
        this.apartments = result[0];
        this.wages = result[1];

        this.years = new Set<number>(this.apartments.map(i => i.year));
        this.selectedYear = this.years.values().next().value;

        this.loaderService.loadChartPackages('corechart').subscribe(() => {

          var data = google.visualization.arrayToDataTable(this.getData(this.apartments, this.wages));
    
          var options = {
            title: ' X=AVG Stays, Y=GDP, Bubble size=GDP, Bubble color=Country',
            hAxis: {title: 'AVG Stays'},
            vAxis: {title: 'GDP'},
            bubble: {textStyle: {fontSize: 11}}
          };
    
          var bubbleChart = new google.visualization.BubbleChart(document.getElementById('avg_stays_vs_gdp_by_country'));
          bubbleChart.draw(data, options);
      });
    });
  }

  onChange(year) {
    this.selectedYear = year;
    this.loaderService.loadChartPackages(ChartType.ColumnChart).subscribe(() => {

      var data = google.visualization.arrayToDataTable(this.getData(this.apartments, this.wages));
      
      var options = {
        title: ' X=AVG Stays, Y=GDP, Bubble size=GDP, Bubble color=Country',
        hAxis: {title: 'AVG Stays'},
        vAxis: {title: 'GDP'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var bubbleChart = new google.visualization.BubbleChart(document.getElementById('avg_stays_vs_gdp_by_country'));
      bubbleChart.draw(data, options);
    });
  }

  getYears(apartments: Apartment[]): number {
    var maxYear = apartments[0].year;
    apartments.forEach(i => {
      if (i.year > maxYear)
        maxYear = i.year;
    })
    return maxYear;
  }

  getData(apartments: Apartment[], wages: Wage[]) {
    var data = []; // Column names
    data.push(['Country', 'AVG Stays', 'GDP']);

    var apartmentCountries = apartments.filter(i => i.year == this.selectedYear).map(i => i.country);
    var wageCountries = wages.filter(i => i.year == this.selectedYear).map(i => i.country);

    var countries = new Set<string>(apartmentCountries.concat(wageCountries));

    countries.forEach(c => data.push([c.toLowerCase(),0,0]));

    var avgApartments = apartments.filter(i => i.year == this.selectedYear).map(i => {
      return {country:i.country,avg:i.avg}
    });
    var gdpWages = wages.filter(i => i.year == this.selectedYear).map(i => {
      return {country:i.country,percentage_of_gdp_per_capita:i.percentage_of_gdp_per_capita}
    });

    for (var a of avgApartments) {
      for (var d of data) {
        if(a.country.toLowerCase() === d[0]) {
          d[1] = a.avg;
        }
      }
    }

    for (var g of gdpWages) {
      for (var d of data) {
        if(g.country.toLowerCase() === d[0]) {
          d[2] = g.percentage_of_gdp_per_capita;
        }
      }
    }

    return data;
  }

}
