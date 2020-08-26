import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService<E> {

  protected miUrl: string;

  constructor(protected http: HttpClient) { }

  getAll(): Observable<E[]> {
    return this.http.get<E[]>(this.miUrl)
    .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<E> {
    return this.http.get<E>(this.miUrl + id)
    .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.miUrl + id)
    .pipe(catchError(this.handleError));
  }

  post(entity: E): Observable<E> {
    return this.http.post<E>(this.miUrl, entity)
    .pipe(catchError(this.handleError));
  }

  put(id: number, entity: E) {
    return this.http.put<E>(this.miUrl + id, entity)
    .pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = 'Error manejado';
    if (error.error instanceof ErrorEvent) {
      //error de cliente
      errorMessage = `Error: ${error.error.mensage}`;
    } else {
      //error de server
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nError de Servidor`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
