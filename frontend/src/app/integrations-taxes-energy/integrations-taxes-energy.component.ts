import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Energy } from '../energy';
import { EnergyService } from '../energy.service';
import { Tax } from '../tax';
import { TaxService } from '../tax.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-integrations-taxes-energy',
  templateUrl: './integrations-taxes-energy.component.html',
  styleUrls: ['./integrations-taxes-energy.component.css']
})
export class IntegrationsTaxesEnergyComponent implements OnInit {

  energy: Energy[];
  taxes: Tax[]

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  country: string;
  countryOptions: string[];


  constructor(private energyService: EnergyService, private taxService: TaxService) { }

  ngOnInit(): void {
    forkJoin({
      requestEnergy: this.energyService.getEnergy(),
      requestTax: this.taxService.getTaxes()
    }).subscribe(({ requestEnergy, requestTax }) => {
      this.energy = requestEnergy;
      this.taxes = requestTax;

      this.countryOptions = [...new Set(this.taxes.map(tax => tax.country))];
      this.country = this.countryOptions[0]

      var dataChart = this.generateData(this.country, this.taxes, this.energy);
      this.drawChart(dataChart);
    });
  }

  onChange(country: string) {
    this.country = country;
    var dataChart = this.generateData(this.country, this.taxes, this.energy);
    this.drawChart(dataChart);
  }

  private generateData(country: string, taxes: Tax[], energy: Energy[]) {
    var energyByYear = energy.reduce(function (map, obj) {
      var dataYear = [];
      if (map.has(obj.year)) {
        dataYear = map.get(obj.year);
      }
      dataYear.push(obj);
      map.set(obj.year, dataYear);
      return map;
    }, new Map());

    var taxByYear = taxes.reduce(function (map, obj) {
      var dataYear = [];
      if (map.has(obj.year)) {
        dataYear = map.get(obj.year);
      }
      dataYear.push(obj);
      map.set(obj.year, dataYear);
      return map;
    }, new Map());

    var dataPopulation: number[] = [];
    var dataEnergyPer: number[] = [];
    for (const year of taxByYear.keys()) {
      var dataTaxCountry = taxByYear.get(year).filter((element) => {
        return element.country == country
      })[0];
      dataPopulation.push(dataTaxCountry.population);

      if (energyByYear.has(year)) {
        var dataEnergyList = energyByYear.get(year);
        var filterDataEnergyList = dataEnergyList.filter((element) => {
          return element.country == country
        });
        if (filterDataEnergyList.length > 0) {
          dataEnergyPer.push(filterDataEnergyList[0]['percentage-re-total']);
        } else {
          dataEnergyPer.push(0);
        }
      }
    }
    return {
      population: dataPopulation,
      dataEnergyPer: dataEnergyPer,
      years: taxByYear.keys()
    }
  }

  private drawChart(dataChart) {
    this.chartOptions = {
      title: {
        text: 'Población y Producción de energías renovables'
      },
      xAxis: [{
        categories: [...dataChart.years],
        crosshair: true
      }],
      yAxis: [{
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: 'Población',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }, {
        title: {
          text: 'Porcentaje total de energías renovables',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value} %',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      series: [
        {
          name: 'Población',
          type: 'column',
          data: dataChart.population
        }, {
          name: 'Porcentaje total de energías renovables',
          type: 'column',
          yAxis: 1,
          data: dataChart.dataEnergyPer
        }
      ]
    }
  }

}
