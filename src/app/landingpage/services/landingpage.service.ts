import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Category, Item } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {

  private categoriesDataSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesDataSubject.asObservable();

  private itemsByCategorySubject = new BehaviorSubject<Item[]>([]);
  public itemsByCategory$ = this.itemsByCategorySubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getCategories() {
    this.httpClient.get<Category[]>('http://localhost:3000/categories').subscribe(data => {
      this.categoriesDataSubject.next(data);
    });
  }

  getItemsByCategory(id){
    this.httpClient.get<Item[]>(`http://localhost:3000/categories/${id}`).subscribe(data => {
      this.itemsByCategorySubject.next(data);
    });
  }

  // public getCountries(): Observable<Country[]> {
  //   return this.httpClient.get<CountriesData>('assets/data.json')
  //   .pipe(
  //     map (res => {
  //       console.log('countries', res.countries);        
  //       return res.countries;
  //     })
  //   )
  // }
}
