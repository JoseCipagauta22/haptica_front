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
    // this.httpClient.get<Category[]>('http://localhost:3000/categories').subscribe(data => {
    //   this.categoriesDataSubject.next(data);
    // });
    // this.categoriesDataSubject.next(null);

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
      'Content-Type': 'application/json'
      // 'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    });

    console.log('env', environment.API_URL);
    

    this.httpClient.get<Category[]>(`${environment.API_URL}/categories`, {headers}).subscribe(data => {
      this.categoriesDataSubject.next(data);
      // console.log('this is', data);
      
    });
  }

  getCategoryBy(id){
    
    // this.httpClient.get<Category>(`https://haptica-back.onrender.com/categories/${id}`).subscribe(data => {
    //   this.CategoryBySubject.next(data);
    // });
    
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
      'Content-Type': 'application/json'
      // 'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    });

    this.httpClient.get<Category>(`${environment.API_URL}/categories/${id}`,{headers}).subscribe(data => {
      this.CategoryBySubject.next(data);
    });
  }

  setItem(item: Item){
    this.itemSubject.next(item);
  }

  updateState(body: figure){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
      'Content-Type': 'application/json'
      // 'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    });

    this.httpClient.put<figure>(`${environment.API_URL}/figures/1`, body, {headers})
        .subscribe(data => console.log(data));
  }

  cleanCategoRyBy$(){
    this.CategoryBySubject.next(null);
    this.itemSubject.next(null);
  }

}
