import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProofService } from '../../services/proof.service';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.scss'
})
export class ResultadoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  result$: Observable<boolean>;
  texto: string;

  constructor(private router: Router, private proofService: ProofService,) { }
  ngOnInit(): void {
    this.result$ = this.proofService.result$;
    this.subscription = this.proofService.result$.subscribe((value)=> console.log('resultComponent', value));

    // if (this.result$) {
      
    // }
  }
  
  redirecTo(url:String){
    this.router.navigateByUrl(`inicio/${url}`);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.proofService.cleanResult();
    }
    // throw new Error('Method not implemented.');
  }
}
