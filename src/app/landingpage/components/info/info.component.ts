import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingpageService } from '../../services/landingpage.service';
import { Category, Item } from '../../interfaces/categories';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit, OnDestroy{

  url: string = '../../../../assets';
  categoryId: string;
  categoryBy$: Observable<Category>;
  category: Category;
  item$: Observable<Item>;
  numberOfItems: number;
  disabled: boolean = false;  
  disabledBack: boolean = true;  
  private subscription: Subscription;
  
  @ViewChild('nextButton', {read: ElementRef}) nextButtonRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('backButton', {read: ElementRef}) backButtonRef!: ElementRef<HTMLButtonElement>;

  constructor(private router: Router, private route: ActivatedRoute, public landingpageService: LandingpageService, private renderer2:Renderer2) {}
  
  ngOnInit(): void {
    this.getCategoryById();
    this.item$ = this.landingpageService.item$;   
    window.scroll(0,0);
  }

  getCategoryById(){
    this.route.params.subscribe((params)=> this.categoryId = params['id']);
    this.landingpageService.getCategoryBy(this.categoryId);
    this.categoryBy$ = this.landingpageService.CategoryBy$;

    this.subscription = this.categoryBy$.subscribe((value)=>{
      if (value) {
        
        // console.log('url' + this.url );
        // console.log('value', value);


        value.items.sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          // a must be equal to b
          return 0;
      });

      this.url += '/' + value.tittle + '/' + value.items[0].image;
        
        

        this.landingpageService.setItem(value.items[0]);
        this.numberOfItems = value.items.length;
        this.category = value;
      }
    });
  }

  redirecTo(){
    this.router.navigateByUrl('inicio');
  }

  next(id){
    let position = this.category.items.findIndex(item => item.id === id);
    if (position < this.numberOfItems - 1) {
      position += 1
    }

    if (position == this.numberOfItems - 1 ) {
      this.disabled = true;
      this.renderer2.removeClass(this.nextButtonRef.nativeElement, 'button-come-back');
      this.renderer2.addClass(this.nextButtonRef.nativeElement, 'button-come');
    }

    this.landingpageService.setItem(this.category.items[position]);
    this.disabledBack = false;
    this.renderer2.removeClass(this.backButtonRef.nativeElement, 'button-come');
    this.renderer2.addClass(this.backButtonRef.nativeElement, 'button-come-back');
  }

  back(id){
    this.disabled = false;
    this.renderer2.removeClass(this.nextButtonRef.nativeElement, 'button-come');
    this.renderer2.addClass(this.nextButtonRef.nativeElement, 'button-come-back');

    let position = this.category.items.findIndex(item => item.id === id);
    if (position > 0 ) {
      position -= 1
    }

    if (position == 0 ) {
      this.disabledBack = true;
      this.renderer2.removeClass(this.backButtonRef.nativeElement, 'button-come-back');
      this.renderer2.addClass(this.backButtonRef.nativeElement, 'button-come');
    }
    this.landingpageService.setItem(this.category.items[position]);
  }

  ngOnDestroy(): void {
    this.landingpageService.cleanCategoRyBy$();
    if (this.subscription) {      
      this.subscription.unsubscribe();
    }
  }
}
