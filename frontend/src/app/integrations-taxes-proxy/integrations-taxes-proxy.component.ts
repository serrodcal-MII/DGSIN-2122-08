import { Component, OnInit } from '@angular/core';
import { Tax } from '../tax';
import { TaxService } from '../tax.service';
import { forkJoin } from 'rxjs';
import { Country } from '../country';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import highchartsDumbbell from "highcharts/modules/dumbbell";
more(Highcharts);
highchartsDumbbell(Highcharts);

@Component({
  selector: 'app-integrations-taxes-proxy',
  templateUrl: './integrations-taxes-proxy.component.html',
  styleUrls: ['./integrations-taxes-proxy.component.css']
})
export class IntegrationsTaxesProxyComponent implements OnInit {

  taxes: Tax[];
  countries: Country[];
  yearOptions: number[];

  year1: number;
  year2: number;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(private taxService: TaxService) { }

  ngOnInit(): void {
    forkJoin({
      requestCountry: this.taxService.getCountries(),
      requestTax: this.taxService.getTaxes()
    }).subscribe(({ requestCountry, requestTax }) => {
      this.taxes = requestTax;
      this.countries = requestCountry;

      this.yearOptions = [...new Set(this.taxes.map(tax => tax.year))];
      this.year1 = this.yearOptions[0];
      this.year2 = this.yearOptions[this.yearOptions.length - 1];

      var dataChart = this.generateData(this.year1, this.year2, this.taxes, this.countries);
      this.drawChart(this.year1, this.year2, dataChart);

    });
  }

  onChange() {
    var dataChart = this.generateData(this.year1, this.year2, this.taxes, this.countries);
    this.drawChart(this.year1, this.year2, dataChart);
  }

  private generateData(year1: number, year2: number, taxes: Tax[], countries: Country[]) {
    var taxByYear = taxes.reduce(function (map, obj) {
      var dataYear = [];
      if (map.has(obj.year)) {
        dataYear = map.get(obj.year);
      }
      dataYear.push(obj);
      map.set(obj.year, dataYear);
      return map;
    }, new Map());

    var countryMap = countries.reduce(function (map, obj) {
      map.set(obj.name.common, obj);
      return map;
    }, new Map());

    var dataYear1 = taxByYear.get(year1);
    var dataYear2 = taxByYear.get(year2);

    for (var i in dataYear1) {
      var countryYear1 = dataYear1[i];
      var countryData = countryMap.get(countryYear1.country);
      dataYear1[i] = { ...countryYear1, ...countryData };
    }

    for (var i in dataYear2) {
      var countryYear2 = dataYear2[i];
      var countryData = countryMap.get(countryYear2.country);
      dataYear2[i] = { ...countryYear2, ...countryData };
    }

    return {
      [year1]: dataYear1,
      [year2]: dataYear2
    }
  }

  private drawChart(year1: number, year2: number, dataChart) {
    var dataYear1 = dataChart[year1];
    var dataYear2 = dataChart[year2];
    var data = []
    dataYear1.forEach(elemData => {
      var dataYear2Country = dataYear2.filter((element) => {
        return element.country == elemData.country;
      });
      var high = 0;
      if (dataYear2Country.length > 0) {
        high = dataYear2Country[0].gdp_per_capita;
      }
      data.push({
        name: elemData.country + ' (' + elemData.cca2 +') ' + elemData.flag,
        low: elemData.gdp_per_capita,
        high: high,
        area: elemData.area
      });
    });

    this.chartOptions = {
      chart: {
        type: 'dumbbell',
        inverted: true
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.key + '</b><br><span style="color:#7CB5EC">&#8226;</span>&nbsp;Cambio de PIB per cápita: <b>' + this.point['low'] + ' - ' + this.point['high'] +  '</b><br><span style="color:#7CB5EC">&#8226;</span>&nbsp;Área: <b>' + this.point['area'] + '</b>';
        }
      },
      legend: {
        enabled: false
      },
      subtitle: {
        text: year1 + ' vs ' + year2
      },
      title: {
        text: 'Comparación de Área y PIB per cápita'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'PIB per cápita ($)'
        }
      },
      series: [{
        name: 'Cambio de PIB per cápita',
        data: data,
        type: undefined
      }]
    }
  }

}
