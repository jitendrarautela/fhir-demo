import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class FhirSearchService {

  constructor(private httpClient: HttpClient) { }

  getPatients(): Observable<Response> {
    return this.httpClient.get<Response>('https://launch.smarthealthit.org/v/r4/fhir/Patient?_revinclude=Condition:subject');
  }
}
