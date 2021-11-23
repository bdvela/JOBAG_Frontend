import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Company} from "../models/company";

@Injectable({
  providedIn: 'root'
})
export class CompaniesApiService {

  constructor(private http: HttpClient) { }

  private url: string = "https://jo-bag-api.herokuapp.com/api/companys"

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  // API Error Handling

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    } else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  getAllCompanies(){
    return this.http.get(`${this.url}`).pipe(retry(2), catchError(this.handleError));
  }

  getCompanyById(id: number): Observable<Company>{
    return this.http.get<Company>(`${this.url}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

}


