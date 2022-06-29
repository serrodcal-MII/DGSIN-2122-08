import { Component, OnInit } from '@angular/core';
import { ChartType, ScriptLoaderService } from 'angular-google-charts';
import { forkJoin } from 'rxjs';
import { Apartment } from '../apartment';
import { ApartmentService } from '../apartment.service';
import { Budget } from '../budget';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-integration-apartments-no-proxy',
  templateUrl: './integration-apartments-no-proxy.component.html',
  styleUrls: ['./integration-apartments-no-proxy.component.css']
})
export class IntegrationApartmentsNoProxyComponent implements OnInit {

  selectedYear: Number;
  years;

  apartments: Apartment[];
  budgets: Budget[];

  constructor(private budgetService: BudgetService, private apartmentService: ApartmentService, private loaderService: ScriptLoaderService) { }

  ngOnInit(): void {
    forkJoin([
      this.apartmentService.getApartments(),
      this.budgetService.getBudgets()
    ]).subscribe(
      (result) => {
        this.apartments = result[0];
        this.budgets = result[1];
        this.years = new Set<number>(this.apartments.map(i => i.year));
        this.selectedYear = this.years.values().next().value;

        this.loaderService.loadChartPackages(ChartType.ColumnChart).subscribe(() => {

          var data = google.visualization.arrayToDataTable(this.getData(this.apartments, this.budgets));
          
          var options = {
            chart: {
              title: 'Company Performance',
              subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            }
          };

          var columnChart = new google.visualization.ColumnChart(document.getElementById('stays_vs_budget_by_country'));
          columnChart.draw(data, null);
        });
      }
    );
  }

  onChange(year) {
    this.selectedYear = year;
    this.loaderService.loadChartPackages(ChartType.ColumnChart).subscribe(() => {

      var data = google.visualization.arrayToDataTable(this.getData(this.apartments, this.budgets));
      
      var options = {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      };

      var columnChart = new google.visualization.ColumnChart(document.getElementById('stays_vs_budget_by_country'));
      columnChart.draw(data, null);
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

  getData(apartments: Apartment[], budgets: Budget[]) {
    var data = []; // Column names
    data.push(['Country', 'Travellers', 'Revnues']);

    var apartmentCountries = apartments.filter(i => i.year == this.selectedYear).map(i => i.country);
    var budgetCountries = budgets.filter(i => i.year == this.selectedYear).map(i => i.country);

    var countries = new Set<string>(apartmentCountries.concat(budgetCountries));

    countries.forEach(c => data.push([c.toLowerCase(),0,0]));

    var travellersApartments = apartments.filter(i => i.year == this.selectedYear).map(i => {
      return {country:i.country,travellers:i.travellers}
    });
    var revenuesBudgets = budgets.filter(i => i.year == this.selectedYear).map(i => {
      return {country:i.country,revenues:i.revenues}
    });

    for (var a of travellersApartments) {
      for (var d of data) {
        if(a.country.toLowerCase() === d[0]) {
          d[1] = a.travellers;
        }
      }
    }

    for (var b of revenuesBudgets) {
      for (var d of data) {
        if(b.country.toLowerCase() === d[0]) {
          d[2] = b.revenues;
        }
      }
    }
    
    return data;
  }

}
