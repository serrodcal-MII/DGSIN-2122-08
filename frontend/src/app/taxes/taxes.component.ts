import { Component, OnInit } from '@angular/core';
import { Tax } from '../tax';
import { TaxService } from '../tax.service';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export class TaxesComponent implements OnInit {

  showError: boolean;
  errorMessage: string;

  taxes!: Tax[];
  tax?= new Tax(null, null, null, null, null);

  constructor(private taxService: TaxService) { }

  ngOnInit(): void {
    this.getTaxes();
  }

  getTaxes(): void {
    this.taxService.getTaxes().subscribe(
      taxes => this.taxes = taxes
    );
  }

  addTax(formTax: NgForm): void {
    if(!this.tax.country || (this.tax.year == null) || (this.tax.gdp_per_capita == null) || (this.tax.total_tax_revenues == null) || (this.tax.population == null)) {
      return;
    }
    this.showError = false;
    this.errorMessage = null;
    this.taxService.addTax(this.tax).subscribe(
      result => this.handleResponse(formTax, result)
    );
  }

  deleteTax(country: string, year: number) {
    this.taxService.deleteTax(country, year).subscribe(
      result => this.handleResponse(null, result)
    );
  }

  deleteAllTaxes() {
    this.taxService.deleteAllTaxes().subscribe(
      result => this.handleResponse(null, result)
    );
  }

  private handleResponse(formTax: NgForm, result: any) {
    if (result && result.ok !== undefined && !result.ok) {
      this.showError = true;
      var message = "";
      if (result.status == 409) {
        message = "Ya existe un registro para ese país y año";
      } else if (result.status == 422) {
        message = "Es obligatorio informar todos los datos.";
      } else if (result.status == 404) {
        message = "El registro que intenta eliminar no existe";
      } else {
        message = "Ha ocurrido un error en el servidor. Inténtelo más tarde."
      }
      this.errorMessage = message;
    } else {
      if (formTax) {
        this.tax = new Tax(null, null, null, null, null);
        formTax.reset();
      }
      this.getTaxes();
    }
  }

}
