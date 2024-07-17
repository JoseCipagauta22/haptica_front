import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {

  private customersDataSubject = new BehaviorSubject<any>([]);
  public readonly customers$: Observable<any> = this.customersDataSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getCountries() {
    console.log('entra');
    this.httpClient.get<any>('http://localhost:3000/categories').subscribe(data => {
      console.log(data);
    })
  }
}
