import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LandingpageService } from '../../services/landingpage.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../interfaces/categories';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit, AfterViewInit{

  @ViewChild('button', {read: ElementRef}) buttonRef!: ElementRef<HTMLButtonElement>;
  categories$: Observable<Category[]>;
  categoryBy$: Observable<Category>;
  private subscription: Subscription;
  private recognition: any;
  data: Category[];
  categoria: Category;
  idItemCategoria: number;
  numberOfItems: number;

  constructor(private renderer2:Renderer2, public landingpageService: LandingpageService) {
    // Verifica si la API está disponible
    const { webkitSpeechRecognition }: any = window;
    this.recognition = new (webkitSpeechRecognition)();
    this.recognition.continuous = false; // No continuar reconociendo
    this.recognition.interimResults = false; // No mostrar resultados intermedios

    // Maneja el resultado del reconocimiento
    this.recognition.onresult = (event: any) => {
      let transcript = event.results[0][0].transcript;
      if (transcript.includes('inicio')) {
        this.test();
      }

      this.data.forEach(element => {       
        if (transcript.replace(/[^a-zA-Z0-9]/g, '').includes(element.tittle.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''))) {
          this.landingpageService.getCategoryBy(element.id);
          this.info();
        }
      });

      if (transcript.includes('siguiente')) {
        this.next(this.idItemCategoria);
      }

      if (transcript.includes('anterior')) {
        this.back(this.idItemCategoria);
      }

      if (transcript.includes('repetir')) {
        this.repeat(this.idItemCategoria);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Error de reconocimiento:', event.error);
    };
  }

  ngOnInit(): void {
    this.categories$ = this.landingpageService.categories$;
    this.categoryBy$ = this.landingpageService.CategoryBy$;
    this.landingpageService.getCategories();
    this.categories$.subscribe((value)=>this.data = value);
  }

  test(){
    let texto = 'Bienvenidos, este es el sena inclusivo, este es el menu:';
    const utterance = new SpeechSynthesisUtterance(texto);
    speechSynthesis.speak(utterance);

    this.data.forEach(element => {
      const utterance = new SpeechSynthesisUtterance(element.tittle);
      speechSynthesis.speak(utterance);
    });
  }

  presionarBoton(){
    this.recognition.start();
  }

  info(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.categoryBy$.subscribe((value) =>{
      if (value) {
        this.categoria = value;
        this.idItemCategoria = value.items[0].id;
        this.numberOfItems = value.items.length;

        const utterance = new SpeechSynthesisUtterance(value.items[0].tittle);
        speechSynthesis.speak(utterance);

        const utterance2 = new SpeechSynthesisUtterance(value.items[0].description);
        speechSynthesis.speak(utterance2);
        this.landingpageService.cleanCategoRyBy$();
      }
    });
  }

  next(id){
    let position = this.categoria.items.findIndex(item => item.id === id);
    if (position < this.numberOfItems - 1) {
      position += 1
      this.idItemCategoria = this.categoria.items[position].id;
      const utterance = new SpeechSynthesisUtterance(this.categoria.items[position].tittle);
      speechSynthesis.speak(utterance);

      const utterance2 = new SpeechSynthesisUtterance(this.categoria.items[position].description);
      speechSynthesis.speak(utterance2);
      this.landingpageService.cleanCategoRyBy$();
    }
  }

  back(id){
    let position = this.categoria.items.findIndex(item => item.id === id);
    if (position > 0 ) {
      position -= 1
      this.idItemCategoria = this.categoria.items[position].id;
      const utterance = new SpeechSynthesisUtterance(this.categoria.items[position].tittle);
      speechSynthesis.speak(utterance);

      const utterance2 = new SpeechSynthesisUtterance(this.categoria.items[position].description);
      speechSynthesis.speak(utterance2);
      this.landingpageService.cleanCategoRyBy$();
    }
  }

  repeat(id){
    let position = this.categoria.items.findIndex(item => item.id === id);
    this.idItemCategoria = this.categoria.items[position].id;
    const utterance = new SpeechSynthesisUtterance(this.categoria.items[position].tittle);
    speechSynthesis.speak(utterance);

    const utterance2 = new SpeechSynthesisUtterance(this.categoria.items[position].description);
    speechSynthesis.speak(utterance2);
    this.landingpageService.cleanCategoRyBy$();
  }

  ngAfterViewInit(){
    let altura = document.documentElement.clientHeight;
    altura -= 170;
    let alturaPx = altura.toString();
    alturaPx  += 'px';
    this.renderer2.setStyle(this.buttonRef.nativeElement, 'height', alturaPx);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
