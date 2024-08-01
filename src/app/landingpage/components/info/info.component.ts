import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingpageService } from '../../services/landingpage.service';
import { Item } from '../../interfaces/categories';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit{

  url: string = '../../../../assets/logoSena.png';
  categoryId: string;
  items$: Observable<Item[]>;
  // item$: Observable<Item>;
  item$: Observable<Item[]>;
  // test$: Observable<Item>;
  constructor(private router: Router, private route: ActivatedRoute, public landingpageService: LandingpageService) {
    this.route.params.subscribe((params)=> this.categoryId = params['id']);
    this.landingpageService.getItemsByCategory(this.categoryId);
    this.items$ = this.landingpageService.itemsByCategory$;

   }

  ngOnInit(): void {
    this.item$ = this.items$.pipe(
      map(items => items.filter(item => { 
        return item.id == 1
      }))
    );
    // this.item$.subscribe(val => console.log('mitest', val))
    // this.test$ = this.item$.pipe(map(items => {return items[0]}));
    window.scroll(0,0);
  }

  redirecTo(){
    this.router.navigateByUrl('inicio');
  }

  next(id){

    id = Number(id) + 1;
    this.item$ = this.items$.pipe(
      map(items => items.filter(item => { 
        return item.id == id
      }))
    );
  }

}
