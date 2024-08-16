import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingpageService } from '../../services/landingpage.service';
import { Category, Item } from '../../interfaces/categories';
import { EMPTY, map, Observable } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {

  url: string = '../../../../assets/logoSena.png';
  categoryId: string;
  categoryBy$: Observable<Category>;
  item$: Observable<Item>;
  len$: Observable<Number>;
  disabled: boolean = false;  
  disabledBack: boolean = true;  
  showCard: boolean = false;
  
  @ViewChild('nextButton', {read: ElementRef}) nextButtonRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('backButton', {read: ElementRef}) backButtonRef!: ElementRef<HTMLButtonElement>;

  constructor(private router: Router, private route: ActivatedRoute, public landingpageService: LandingpageService, private renderer2:Renderer2) {
    
  }

  ngOnInit(): void {
    this.getCategoryById();
    this.item$ = this.categoryBy$.pipe(
      map(items => {        
        return items?.items[0]
      })
    );
    setTimeout(() => {
      // console.log("Hello World!");
      this.showCard = true;
    }, 800);
    this.len$ = this.categoryBy$.pipe(map(category => category.items.length));
    
    window.scroll(0,0);
  }


  getCategoryById(){
    this.route.params.subscribe((params)=> this.categoryId = params['id']);
    this.landingpageService.getCategoryBy(this.categoryId);
    this.categoryBy$ = this.landingpageService.CategoryBy$;
  }

  redirecTo(){
    this.router.navigateByUrl('inicio');
  }

  next(id, len){
    this.item$ = this.categoryBy$.pipe(
      map(items => {
        // Encontramos el índice del objeto con el id específico
        let position = items.items.findIndex(item => item.id === id);

        if (position < len - 1) {
          position += 1
        }

        if (position == len - 1 ) {
          this.disabled = true;
          this.renderer2.removeClass(this.nextButtonRef.nativeElement, 'button-come-back');
          this.renderer2.addClass(this.nextButtonRef.nativeElement, 'button-come');
        }
        return items.items[position];
      })
    );
    
    this.disabledBack = false;
    this.renderer2.removeClass(this.backButtonRef.nativeElement, 'button-come');
    this.renderer2.addClass(this.backButtonRef.nativeElement, 'button-come-back');
  }

  back(id){
    // id = Number(id) - 1;  
    this.disabled = false;
    this.renderer2.removeClass(this.nextButtonRef.nativeElement, 'button-come');
    this.renderer2.addClass(this.nextButtonRef.nativeElement, 'button-come-back');

    this.item$ = this.categoryBy$.pipe(
      map(items => {
        // Encontramos el índice del objeto con el id específico
        let position = items.items.findIndex(item => item.id === id);

        if (position > 0 ) {
          position -= 1
        }

        if (position == 0 ) {
          this.disabledBack = true;
          this.renderer2.removeClass(this.backButtonRef.nativeElement, 'button-come-back');
          this.renderer2.addClass(this.backButtonRef.nativeElement, 'button-come');
        }
        return items.items[position];
      })
    );
  }
}
