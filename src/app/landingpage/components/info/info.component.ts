import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingpageService } from '../../services/landingpage.service';
import { Category, Item } from '../../interfaces/categories';
import { map, Observable } from 'rxjs';

import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements AfterViewInit, OnInit {

  url: string = '../../../../assets/logoSena.png';
  categoryId: string;
  categoryBy$: Observable<Category>;
  item$: Observable<Item>;
  len$: Observable<Number>;

  disabled: boolean = false;

  // @ViewChild('MyRef', {static: true}) element: ElementRef;
  // @ViewChild('matButton', { static: true, read: ElementRef }) matButton: ElementRef;

  // @ViewChild("myButton") myButton1: MatButton;
  // @ViewChild("myButton", { read: ElementRef }) myButtonRef: ElementRef;
  
  
  @ViewChild('myButton', {static: true}) myButtonRef!: ElementRef<HTMLButtonElement>;

  constructor(private router: Router, private route: ActivatedRoute, public landingpageService: LandingpageService, private renderer2:Renderer2) {
    this.getCategoryById();
    this.len$ = this.categoryBy$.pipe(map(category => category.items.length));
  }

  ngOnInit(): void {
    this.item$ = this.categoryBy$.pipe(
      map(items => items?.items.find(item => item?.id == 1))
    );

    // console.log(this.myButton1);
    // console.log(this.myButtonRef.nativeElement)
    // this.myButtonRef.nativeElement.style.backgroundColor = "orange";
    // this.myButtonRef.nativeElement.style.border = "solid 1px black";


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
    id = Number(id) + 1;

    

    

    // const myButton = this.element.nativeElement;

    // this.renderer2.setStyle(this.myButtonRef.nativeElement, 'backgroundColor', 'yellow');
    // this.renderer2.removeClass(this.myButtonRef.nativeElement, 'button-come-back')
    // this.renderer2.addClass(this.myButtonRef.nativeElement, 'button-come')
    
    console.log(id, len);
    if (id <= len) {      
      this.item$ = this.categoryBy$.pipe(
        map(items => items?.items.find(item => item?.id == id))
      );
    }

    if (id == len) {
      this.disabled = true;
    }
  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.myButtonRef) {
        console.log('test',this.myButtonRef.nativeElement);
        // console.log(this.myButton.nativeElement); // Logs the button element
      } else {
        console.error('Button element is not available');
      }
    });


    // console.log('ngAfter', this.myButtonRef.nativeElement);
    // this.myButtonRef.nativeElement.textContent = 'esPrueba';
    // console.log('alert (afterviewinit)', this.element.nativeElement.afterviewinit);
  }

}
