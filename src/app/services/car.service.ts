import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Car } from '../models/car';

@Injectable({ providedIn: 'root' })
export class CarService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public getCars(page: number, sDate?: string, eDate?: string): Observable<any> {
    let url = `${environment.apiUrl}/api/cars?page=${page}&size=${environment.numElements}`;

    if (sDate && eDate) {
      url += `&sDate=${sDate}&eDate=${eDate}`;
    }

    return this.http.get(url)
      .pipe(
        catchError(this.handleError<Car[]>('getCars', [])
        ));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
