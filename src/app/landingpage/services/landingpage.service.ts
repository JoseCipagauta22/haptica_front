import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Category, figure, Item } from '../interfaces/categories';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {

  private categoriesDataSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesDataSubject.asObservable();

  private CategoryBySubject = new BehaviorSubject<Category>(null);
  public CategoryBy$ = this.CategoryBySubject.asObservable();

  private itemsSubject = new BehaviorSubject<Item[]>(null);
  public items$ = this.itemsSubject.asObservable(); 
  
  private itemSubject = new BehaviorSubject<Item>(null);
  public item$ = this.itemSubject.asObservable(); 



  constructor(private router: Router, private httpClient: HttpClient) { }

  public getCategories() {
    // this.httpClient.get<Category[]>('http://localhost:3000/categories').subscribe(data => {
    //   this.categoriesDataSubject.next(data);
    // });
    this.categoriesDataSubject.next(null);

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
      'Content-Type': 'application/json'
      // 'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    });

    this.httpClient.get<Category[]>('https://8d53-2803-17a0-1014-7e-707c-6bbc-7878-bf26.ngrok-free.app/categories', {headers}).subscribe(data => {
      this.categoriesDataSubject.next(data);
    });
  }

  getCategoryBy(id){
    
    // this.httpClient.get<Category>(`http://localhost:3000/categories/${id}`).subscribe(data => {
    //   this.CategoryBySubject.next(data);
    // });
    
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
      'Content-Type': 'application/json'
      // 'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    });

    this.httpClient.get<Category>(`https://8d53-2803-17a0-1014-7e-707c-6bbc-7878-bf26.ngrok-free.app/categories/${id}`,{headers}).subscribe(data => {
      this.CategoryBySubject.next(data);
      this.categoriesDataSubject.next(null);
    });
  }

  // getItemsByCategory(){
  //   this.items$ = this.CategoryBy$.pipe(
  //     map(category => {return category.items})
  //   );
  // }


  updateState(body: figure){

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
      'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    });

    this.httpClient.put<figure>('https://8d53-2803-17a0-1014-7e-707c-6bbc-7878-bf26.ngrok-free.app/figures/1', body, {headers})
        .subscribe(data => console.log(data));
  }

  cleanCategoRyBy$(){
    this.categoriesDataSubject.next(null);
    
  }

}
