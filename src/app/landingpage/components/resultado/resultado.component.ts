import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProofService } from '../../services/proof.service';
import { Observable, Subscriber, Subscription } from 'rxjs';

// import {} from ''

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from '../../interfaces/proof';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.scss'
})
export class ResultadoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private subscriptionUser: Subscription;
  result$: Observable<boolean>;
  user$: Observable<User>;
  texto: string;

  

  constructor(private router: Router, private proofService: ProofService,) { }
  ngOnInit(): void {
    this.result$ = this.proofService.result$;
    this.user$ = this.proofService.user$;
    // this.subscription = this.proofService.result$.subscribe((value)=> console.log('resultComponent', value));

    // if (this.result$) {
      
    // }
  }
  
  redirecTo(url:String){
    this.router.navigateByUrl(`inicio/${url}`);
  }

  pdf(){
    // console.log(this.user$);
    let userData: User; 
    this.user$.subscribe((value)=>{
      console.log('test', value);
      userData = value
    });
    
    const doc = new jsPDF();

		// Add content to the PDF.
		doc.setFontSize(16);
		doc.text('Senna CIMM Certifica que: ', 70, 50);
		doc.setFontSize(12);
		doc.text(
			userData.name + ' identificado con C.C ' + userData.numDoc + ' con el rol de ' + userData.role + ', culmino con exito la induccion a seguridad y salud en el trabajo',
			10,
			60,
      { align: "justify", lineHeightFactor: 1.5, maxWidth: 190 }
		);

    // let dateTime = new Date();

    const today = new Date();

    // Format date in Spanish (Spain)
    const formattedDate = today.toLocaleDateString('es-ES', {
      weekday: 'long',  // 'long' for full day name, 'short' for abbreviated day name
      year: 'numeric',  // 'numeric' for full year, '2-digit' for short year
      month: 'long',    // 'long' for full month name, 'short' for abbreviated month name
      day: 'numeric'    // 'numeric' for day of the month
    });

    doc.text('Fecha: '+ formattedDate, 10, 80);

    doc.addImage('../../../../assets/logoSena.png', '', 90, 10, 30, 30);

    doc.save(userData.name);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.proofService.cleanResult();
    }
    // throw new Error('Method not implemented.');
  }
}
