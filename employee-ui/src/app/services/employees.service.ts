import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { throwError, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private baseUrl: string;

  AddEvent: Subject<Employee> = new Subject<Employee>();
  SaveEvent: Subject<Employee> = new Subject<Employee>();

  constructor(private httpClient: HttpClient, private config: ConfigService) {
    this.baseUrl = `${config.getConfig().managerApi.employees.url}/employees`
  }

  public AddListenerEvent() : Observable<Employee>  {
    return this.AddEvent;
  }

  public SaveListenerEvent() : Observable<Employee>  {
    return this.SaveEvent;
  }


  public GetAll() {    
    return this.httpClient.get<Employee[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  public GetByAge(age: number) {    
    return this.httpClient.get<Employee[]>(this.baseUrl + "?byAge=" + age)
      .pipe(
        catchError(this.handleError)
      );
  }

  public GetByGender(gender: number) {    
    return this.httpClient.get<Employee[]>(this.baseUrl + "?byGender=" + gender)
      .pipe(
        catchError(this.handleError)
      );
  }

  public GetByName(name: string) {    
    return this.httpClient.get<Employee[]>(this.baseUrl + "?byName=" + name)
      .pipe(
        catchError(this.handleError)
      );
  }

  public Get(employeeId: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${employeeId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public Add(employee: Employee): Observable<Employee> {
    employee.employeeId = 0;
    return this.httpClient.post<Employee>(this.baseUrl, employee)
      .pipe(
        tap(em => {
          this.AddEvent.next(em)
        }),
        catchError(this.handleError)
      );
  }

  public Delete(employeeId: number): Observable<number> {
    return this.httpClient.delete<number>(`${this.baseUrl}/${employeeId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public Save(employeeId: number, employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseUrl}/${employeeId}`, employee)
      .pipe(
        tap(em => this.SaveEvent.next(em)),
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
