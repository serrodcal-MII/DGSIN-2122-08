import { Component, OnInit } from '@angular/core';
import { ChartType, ScriptLoaderService } from 'angular-google-charts';
import { Tax } from '../tax';
import { TaxService } from '../tax.service';

@Component({
  selector: 'app-taxes-dashboard',
  templateUrl: './taxes-dashboard.component.html',
  styleUrls: ['./taxes-dashboard.component.css']
})
export class TaxesDashboardComponent implements OnInit {

  taxes: Tax[];

  //showChart: boolean = false;

  constructor(private taxService: TaxService, private loaderService: ScriptLoaderService) { }

  ngOnInit(): void {
    this.taxService.getTaxes().subscribe((result) => {
      this.taxes = result;
      var geoOptions = {
        region: '150',
        colorAxis: {colors: ['#FFE000', '#799F0C','#00416A']}
      };

      //GeoChart
      this.loaderService.loadChartPackages(ChartType.GeoChart).subscribe(() => {
        var geoData = this.formGeoData(this.taxes);
        var geoChart = new google.visualization.GeoChart(document.getElementById('population_pib_region'));
        geoChart.draw(geoData, geoOptions);
      });

      var comboOptions = {
        vAxis: {title: 'PIB per cápita', format : 'currency'},
        hAxis: {title: 'Año'},
        seriesType: 'bars',
        series: {5: {type: 'line'}}
      }
      //ComboChart
      this.loaderService.loadChartPackages('corechart').subscribe(() => {
        var comboData = this.formComboData(this.taxes);
        var comboChart = new google.visualization.ComboChart(document.getElementById('all_taxes_region'));
        comboChart.draw(comboData, comboOptions);
      });
    });
  }

  private formGeoData(taxes: Tax[]) {
    var data: (string | number)[][];
    data = [['Country', 'Población', 'PIB per cápita ($)']];
    var dataFilter = taxes.filter((element) => {
      return element.year == 2019
    });
    for (var i in dataFilter) {
      var tax = dataFilter[i];
      data.push([tax.country, tax.population, tax.gdp_per_capita]);
    }
    return google.visualization.arrayToDataTable(data);
  }

  private formComboData(taxes: Tax[]) {
    var countries = new Set<string>();
    var data: (string | number)[][];
    var dataByYear = new Map();

    for (var i in taxes) {
      var tax = taxes[i];
      countries.add(tax.country);
      var dataYear = [];
      if (dataByYear.has(tax.year)) {
        dataYear = dataByYear.get(tax.year);
      }
      var dataCountry = {
        'country' : tax.country,
        'gdp' : tax.gdp_per_capita
      }
      dataYear.push(dataCountry);
      dataByYear.set(tax.year, dataYear);

    }

    var dataHeader = ['Año'];
    dataHeader = dataHeader.concat(Array.from(countries));
    data = [];
    for (const year of dataByYear.keys()) {
      var dataCountries = dataByYear.get(year);
      var row = [year.toString()];
      for (var i in dataCountries) {
        var dataYearCountry = dataCountries[i];
        row.push(dataYearCountry.gdp);
      }
      data.push(row);
    }
    data.unshift(dataHeader);
    return google.visualization.arrayToDataTable(data);
  }

}
