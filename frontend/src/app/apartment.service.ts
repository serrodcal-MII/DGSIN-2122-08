import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apartment } from './apartment';
import { Wage } from './wage';
//import { APARTMENTS } from './mock-apartments';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  private apartmentsUrl = 'https://dgsin-2122-08.herokuapp.com/api/v1/apartments';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'}),
    responseType: 'text' as 'text'
  };

  constructor(private http: HttpClient) { }

  getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apartmentsUrl)
    .pipe(
      catchError(this.handleError<Apartment[]>('getApartments', []))
    );
  }

  getApartment(apartmentCountry: string, apartmentYear: number): Observable<Apartment> {
    return this.http.get<Apartment>(`${this.apartmentsUrl}/${apartmentCountry}/${apartmentYear}`)
    .pipe(
      catchError(this.handleError<Apartment>(`getApartment country=${apartmentCountry} year=${apartmentYear}`))
    );
  }

  addApartment(newApartment: Apartment): Observable<any> {
    return this.http.post(this.apartmentsUrl, newApartment, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('addApartment'))
    );
  }

  updateApartment(updatedApartment: Apartment): Observable<Apartment> {
    return this.http.put<Apartment>(`${this.apartmentsUrl}/${updatedApartment.country}/${updatedApartment.year}`, updatedApartment)
      .pipe(
        catchError(this.handleError<Apartment>(`updateApartment country=${updatedApartment.country} year=${updatedApartment.year}`))
      );
  }

  deleteApartments(): Observable<any> {
    return this.http.delete(this.apartmentsUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('deleteApartments'))
    );
  }

  deleteApartment(apartmentCountry: string, apartmentYear: number): Observable<any> {
    return this.http.delete(`${this.apartmentsUrl}/${apartmentCountry}/${apartmentYear}`, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>(`deleteApartment country=${apartmentCountry} year=${apartmentYear}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  // Integrations

  private minimumWageUrl = 'https://dgsin-2122-08.herokuapp.com/proxymw/api/v1/minimum-wage';

  getWages(): Observable<Wage[]> {
    return this.http.get<Wage[]>(this.minimumWageUrl)
    .pipe(
      catchError(this.handleError<Wage[]>('getWages', []))
    );
  }

}
