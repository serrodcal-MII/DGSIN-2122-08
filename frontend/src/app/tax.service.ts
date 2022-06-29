import { Injectable } from '@angular/core';
import { Tax } from './tax';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  private taxesUrl = 'https://dgsin-2122-08.herokuapp.com/api/v1/tax-gdp-ratios';

  constructor(private http: HttpClient) { }

  getTaxes(): Observable<Tax[]> {
    return this.http.get<Tax[]>(this.taxesUrl).pipe(
      catchError(this.handleError<Tax[]>('getTaxes', []))
    );
  }

  addTax(newTax: Tax): Observable<any> {
    return this.http.post(this.taxesUrl, newTax, this.httpOptions).pipe(
      catchError(this.handleError<any>('addTax'))
    );
  }

  deleteTax(country: string, year: number): Observable<any> {
    return this.http.delete(`${this.taxesUrl}/${country}/${year}`, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteTax country=${country} year=${year}'))
    )
  }

  getTax(country: string, year: string): Observable<any> {
    return this.http.get<Tax>(`${this.taxesUrl}/${country}/${year}`).pipe(
      catchError(this.handleError<any>(`getTax country=${country} year=${year}`))
    )
  }

  updateTax(updatedTax: Tax): Observable<Tax> {
    return this.http.put<Tax>(`${this.taxesUrl}/${updatedTax.country}/${updatedTax.year}`, updatedTax).pipe(
      catchError(this.handleError<Tax>(`updateTax country=${updatedTax.country} year=${updatedTax.year}`))
    );
  }

  deleteAllTaxes(): Observable<any> {
    return this.http.delete(this.taxesUrl, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteAllTaxes'))
    );
  }

  // Proxy
  private restCountriesProxyURL = 'https://dgsin-2122-08.herokuapp.com/proxyRestCountries/v3.1/all?fields=name,cca2,flag,area';
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.restCountriesProxyURL).pipe(
      catchError(this.handleError<Country[]>('getCountries Proxy', []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(error);
    }
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'text' as 'text'
  };
}
