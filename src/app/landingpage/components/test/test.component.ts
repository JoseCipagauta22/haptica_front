import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LandingpageService } from '../../services/landingpage.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../interfaces/categories';
import { Title } from '@angular/platform-browser';

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
      if (transcript.includes('instrucciones')) {
        let texto2 = 'Si desea acceder a S.G.S.S.T. diga: S.G.S.S.T. Para acceder a emergencias diga: emergencias. Para acceder a señalización y peligros diga: señalización y peligros. Si quiere repetir el menú diga: inicio. Si solo desea repetir las instrucciones diga: instrucciones. Recuerde tocar la pantalla una vez antes de hablar.';
        const utterance2 = new SpeechSynthesisUtterance(texto2);
        speechSynthesis.speak(utterance2);
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

  /*test(){
    let texto = 'Bienvenido a la aplicación web para introducción a la seguridad y salud en el trabajo del Centro industrial de mantenimiento y manufactura. A continuación escuchará el menú:';
    const utterance = new SpeechSynthesisUtterance(texto);
    speechSynthesis.speak(utterance);

    this.data.forEach(element => {
      console.log(element);
      const utterance = new SpeechSynthesisUtterance(element.tittle);
      speechSynthesis.speak(utterance);
    });

    //this.data.forEach(element => {
    //  const utterance = new SpeechSynthesisUtterance(element.description);
    //  speechSynthesis.speak(utterance);
    //});

    let texto2 = 'Si desea acceder a SGSST diga:  SGSST. Para acceder a emergencias diga: emergencias. Para acceder a señalización y peligros diga: señalización y peligros. Si quiere repetir el menú diga: inicio. Si solo desea repetir las instrucciones diga: instrucciones. Recuerde tocar la pantalla una vez antes de hablar.';
    const utterance2 = new SpeechSynthesisUtterance(texto2);
    speechSynthesis.speak(utterance2);
    

  }*/

    test() {
      this.updateFigure("0", 1, 0);
      let texto = 'Bienvenido a la aplicación web para introducción a la seguridad y salud en el trabajo del Centro industrial de mantenimiento y manufactura. A continuación escuchará el menú:';
      const utterance = new SpeechSynthesisUtterance(texto);
      
      // Primero se habla el mensaje de bienvenida
      speechSynthesis.speak(utterance);
    
      utterance.onend = () => {
        // Luego se recorre cada elemento y se lee el tittle y description secuencialmente
        this.readTitlesAndDescriptions(0);
      };
    }
    
    readTitlesAndDescriptions(index: number) {
      if (index >= this.data.length) {
        // Cuando ya no hay más elementos, lee el texto final (instrucciones)
        let texto2 = 'Si desea acceder a S.G.S.S.T. diga: S.G.S.S.T. Para acceder a emergencias diga: emergencias. Para acceder a señalización y peligros diga: señalización y peligros. Si quiere repetir el menú diga: inicio. Si solo desea repetir las instrucciones diga: instrucciones. Recuerde tocar la pantalla una vez antes de hablar.';
        const utterance2 = new SpeechSynthesisUtterance(texto2);
        speechSynthesis.speak(utterance2);
        return;
      }
    
      // Obtiene el tittle del elemento
      const titleUtterance = new SpeechSynthesisUtterance(this.data[index].tittle);
      
      titleUtterance.onend = () => {
        // Una vez que se lea el tittle, lee la description
        const descriptionUtterance = new SpeechSynthesisUtterance(this.data[index].description);
        
        descriptionUtterance.onend = () => {
          // Luego de leer la description, pasa al siguiente índice
          this.readTitlesAndDescriptions(index + 1);
        };
        
        speechSynthesis.speak(descriptionUtterance);
      };
    
      // Reproduce el tittle
      speechSynthesis.speak(titleUtterance);
    }
    




  presionarBoton(){
    this.recognition.start();
    console.log("Boton presionado xd");
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

        this.updateFigure(this.determinateTemperature(value.items[0].state,), value.items[0].state, value.items[0].figure);

        const utterance = new SpeechSynthesisUtterance(value.items[0].tittle);
        speechSynthesis.speak(utterance);

        const utterance2 = new SpeechSynthesisUtterance(value.items[0].description);
        speechSynthesis.speak(utterance2);
        this.landingpageService.cleanCategoRyBy$();

        let texto1 = 'Para repetir la información diga: repetir. Para avanzar diga: siguiente. Para retroceder diga: anterior. Si desea volver al menú principal diga: Inicio.';
        const utterance1 = new SpeechSynthesisUtterance(texto1);
        speechSynthesis.speak(utterance1);

      }
    });
  }

  next(id){
    let position = this.categoria.items.findIndex(item => item.id === id);
    if (position < this.numberOfItems - 1) {
      position += 1
      console.log("test#####", this.categoria.items[position].id);
      this.idItemCategoria = this.categoria.items[position].id;
      this.updateFigure(this.determinateTemperature(this.categoria.items[position].state), this.categoria.items[position].state, this.categoria.items[position].figure);
      const utterance = new SpeechSynthesisUtterance(this.categoria.items[position].tittle);
      speechSynthesis.speak(utterance);

      const utterance2 = new SpeechSynthesisUtterance(this.categoria.items[position].description);
      speechSynthesis.speak(utterance2);
      this.landingpageService.cleanCategoRyBy$();

      if(position == this.numberOfItems - 1 && this.categoria.id == 1){
        let texto1 = 'Ha concluido el apartado de S.G.S.S.T. Para continuar pulse una vez la pantalla y diga: emergencias';
        const utterance1 = new SpeechSynthesisUtterance(texto1);
        speechSynthesis.speak(utterance1);
      }else if(position == this.numberOfItems - 1 && this.categoria.id == 2){
        let texto2 = 'Ha concluido el apartado de emergencias. Para continuar pulse una vez la pantalla y diga: señalización y peligros.';
        const utterance1 = new SpeechSynthesisUtterance(texto2);
        speechSynthesis.speak(utterance1);
      }else if(position == this.numberOfItems - 1 && this.categoria.id == 3){
        let texto2 = 'Ha concluido el apartado de señalización y peligros. Felicitaciones ya tiene los conceptos básicos de seguridad y salud en el trabajo. Ahora puede volver al inicio.';
        const utterance1 = new SpeechSynthesisUtterance(texto2);
        speechSynthesis.speak(utterance1);
      }

    }
  }

  back(id){
    let position = this.categoria.items.findIndex(item => item.id === id);
    if (position > 0 ) {
      position -= 1
      this.idItemCategoria = this.categoria.items[position].id;
      this.updateFigure(this.determinateTemperature(this.categoria.items[position].state), this.categoria.items[position].state, this.categoria.items[position].figure);

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


  updateFigure(tempetarure: string, state: number, figure: number ){
    this.landingpageService.updateState({temperature: tempetarure, state: Number(state), figure: Number(figure)});
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

  determinateTemperature(state): string {
    let tempetarure = '0';

    if (state == '2') {
      tempetarure = '50'; 
    }

    if (state == '3') {
      tempetarure = '15'; 
    }

    return tempetarure;
  }
}
