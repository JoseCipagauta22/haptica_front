import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Category, figure, Item } from '../interfaces/categories';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {

  private categoriesDataSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesDataSubject.asObservable();

  private CategoryBySubject = new BehaviorSubject<Category>(null);
  public CategoryBy$ = this.CategoryBySubject.asObservable();

  private itemsSubject = new BehaviorSubject<Item[]>([]);
  public items$ = this.itemsSubject.asObservable(); 
  
  private itemSubject = new BehaviorSubject<Item>(null);
  public item$ = this.itemSubject.asObservable(); 

  private showCardItemSubject = new BehaviorSubject<boolean>(false);
  public showCard$ = this.showCardItemSubject.asObservable(); 

  constructor(private router: Router, private httpClient: HttpClient) { }

  public getCategories() {
    this.httpClient.get<Category[]>(`${environment.API_URL}/categories`).subscribe(data => {
      this.categoriesDataSubject.next(data);
    });
  }

  getCategoryBy(id){
    this.httpClient.get<Category>(`${environment.API_URL}/categories/${id}`).subscribe(data => {
      this.CategoryBySubject.next(data);
    });
  }

  setItem(item: Item){
    this.itemSubject.next(item);
  }

  updateState(body: figure){
    this.httpClient.put<figure>(`${environment.API_URL}/figures/1`, body)
        .subscribe(data => console.log(data));
  }

  cleanCategoRyBy$(){
    this.CategoryBySubject.next(null);
    this.itemSubject.next(null);
  }

}