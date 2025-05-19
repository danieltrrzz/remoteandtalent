import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly url: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) { }

  Get<T>(endPoint: string, complement?: string): Observable<T[]> {
    const url = [this.url, endPoint, complement].filter(Boolean).join('/');
    return this.http.get<T[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return of([]);
      })
    );
  }
}
