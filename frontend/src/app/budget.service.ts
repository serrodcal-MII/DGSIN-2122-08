import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Budget } from './budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetsUrl = 'https://dgsin-2122-01.herokuapp.com/api/v1/countries-government-budget';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'}),
    responseType: 'text' as 'text'
  };

  constructor(private http: HttpClient) { }

  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.budgetsUrl)
    .pipe(
      catchError(this.handleError<Budget[]>('getBudgets', []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
