import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Skill } from '../models/skill';


@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient, private config: ConfigService) {
    this.baseUrl = `${config.getConfig().managerApi.skills.url}/skills`
  }

  public GetAll() {    
    return this.httpClient.get<Skill[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError({
      error: error.error.message,
      status: error.status
    });
  };

}
