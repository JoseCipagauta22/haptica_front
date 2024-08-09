import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Category, Item } from '../interfaces/categories';

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



  constructor(private httpClient: HttpClient) { }

  public getCategories() {
    this.httpClient.get<Category[]>('http://localhost:3000/categories').subscribe(data => {
      this.categoriesDataSubject.next(data);
    });

    // const headers = new HttpHeaders({
    //   'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
    //   'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    // });

    // this.httpClient.get<Category[]>('https://a0eb-191-156-53-129.ngrok-free.app/categories', {headers}).subscribe(data => {
    //   this.categoriesDataSubject.next(data);
    // });
  }

  getCategoryBy(id){
    
    this.httpClient.get<Category>(`http://localhost:3000/categories/${id}`).subscribe(data => {
      this.CategoryBySubject.next(data);
    });
    
    // const headers = new HttpHeaders({
    //   'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
    //   'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    // });

    // this.httpClient.get<Category>(`https://a0eb-191-156-53-129.ngrok-free.app/categories/${id}`,{headers}).subscribe(data => {
    //   this.CategoryBySubject.next(data);
    // });
  }

  getItemsByCategory(){
    this.items$ = this.CategoryBy$.pipe(
      map(category => {return category.items})
    );
  }

  getItemById(index){

    // for (let index = 0; index < this.items$.length; index++) {
    //   const element = this.items$[index];
    // }

    // this.items$.forEach(element => {
    //   if (element.) {
        
    //   }
    // });
  }
}
