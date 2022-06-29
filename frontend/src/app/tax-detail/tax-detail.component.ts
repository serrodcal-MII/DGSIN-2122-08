import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tax } from '../tax';
import { TaxService } from '../tax.service';
import {NgForm} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tax-detail',
  templateUrl: './tax-detail.component.html',
  styleUrls: ['./tax-detail.component.css']
})
export class TaxDetailComponent implements OnInit {

  tax= new Tax(null, null, null, null, null);
  showError: boolean;
  errorMessage: string;

  constructor(private taxService: TaxService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getTax();
  }

  goBack(): void {
    this.location.back();
  }

  getTax(): void {
    this.taxService.getTax(this.route.snapshot.paramMap.get('country') as string, this.route.snapshot.paramMap.get('year') as string)
      .subscribe(tax => this.tax = tax);
  }

  saveTax(): void {
    if(!this.tax.country || (this.tax.year == null) || (this.tax.gdp_per_capita == null) || (this.tax.total_tax_revenues == null) || (this.tax.population == null)) {
      return;
    }
    this.showError = false;
    this.errorMessage = null;
    this.taxService.updateTax(this.tax).subscribe(
      result => this.handleResponse(result)
    );
  }

  private handleResponse(result: any) {
    if (result && result.ok !== undefined && !result.ok) {
      this.showError = true;
      var message = "";
      if (result.status == 409) {
        message = "Ya existe un registro para ese país y año";
      } else if (result.status == 422) {
        message = "Es obligatorio informar todos los datos.";
      } else if (result.status == 404) {
        message = "El registro que intenta modificar no existe";
      } else {
        message = "Ha ocurrido un error en el servidor. Inténtelo más tarde."
      }
      this.errorMessage = message;
    } else {
      this.goBack();
    }
  }

}
