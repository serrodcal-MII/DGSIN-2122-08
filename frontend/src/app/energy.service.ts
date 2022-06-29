import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Energy } from './energy';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  private energyUrl = "https://dgsin-2122-02.herokuapp.com/api/v1/renewable-production-stats";

  constructor(private http: HttpClient) { }

  getEnergy(): Observable<Energy[]> {
    return this.http.get<Energy[]>(this.energyUrl).pipe(
      catchError(err => {
        console.log(`getEnergy failed: ${err.message}`);
        return of(err);
      })
    );
  }
}
