import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingpageService } from '../../services/landingpage.service';
import { Category } from '../../interfaces/categories';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  private subscription: Subscription;

  constructor(private router: Router, public landingpageService: LandingpageService) {}
  
  ngOnInit(): void {
    this.categories$ = this.landingpageService.categories$;
    this.landingpageService.getCategories();
  }

  redirecTo(url: string, id?: string){
    id ? this.router.navigateByUrl(`inicio/${url}/${id}`) : this.router.navigateByUrl(`inicio/${url}`);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
