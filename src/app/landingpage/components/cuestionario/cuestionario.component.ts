import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProofService } from '../../services/proof.service';
import { map, Observable, Subscription } from 'rxjs';
import { Question } from '../../interfaces/proof';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.scss'
})
export class CuestionarioComponent implements OnInit, OnDestroy {

  @ViewChild('nextTest', {read: ElementRef}) nextButtonRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('finishButton', {read: ElementRef}) finishButtonRef!: ElementRef<HTMLButtonElement>;
  questions$: Observable<Question[]>;
  question$: Observable<Question>;
  len: number;
  position: number;
  data: Question[];
  private subscription: Subscription;

  constructor(private router: Router, private proofService: ProofService, private renderer2:Renderer2) { }

  ngOnInit(): void {
    this.proofService.getQuestions();
    this.setQuestion(0);
    this.questions$ = this.proofService.questions$;
    this.question$ = this.proofService.question$;
    this.proofService.questions$.subscribe((value)=> this.len = value.length);
  }

  redirecTo(url:String){
    this.router.navigateByUrl(`inicio/${url}`);
  }

  setQuestion(index: number){
    this.subscription = this.proofService.questions$.subscribe(questions => {
      this.data = questions;
      this.proofService.setQuestion(this.data[index]);
    });
  }

  next(id){
    this.position = this.data.findIndex(question => question.id === id);
    if (this.position < this.len - 1) {
      this.position += 1;        
      this.proofService.setQuestion(this.data[this.position]);
    }
    if (this.position === this.len - 1) {  
      this.renderer2.setStyle(this.nextButtonRef.nativeElement, 'display', 'none');
      this.renderer2.removeStyle(this.finishButtonRef.nativeElement, 'display');     
    }
  }

  back(id){
    this.renderer2.removeStyle(this.nextButtonRef.nativeElement, 'display');
    this.renderer2.setStyle(this.finishButtonRef.nativeElement, 'display', 'none');
    this.position = this.data.findIndex(question => question.id === id);
    if (this.position > 0 ) {
      this.position -= 1;
      this.proofService.setQuestion(this.data[this.position]);
    }
  }

  selectedAnswer(idQuestion: number, idAnswer: number){
    this.data.forEach(questionObj => {
      if (questionObj.id === idQuestion) {
        questionObj.answers.forEach(element => {
          if (element.isChecked) {
            element.isChecked = false;
          }
          if (element.id === idAnswer) {
            element.isChecked = true;
          }
        });
      }
    });
  }

  finish(){
    let counter: number = 0;
    this.data.forEach(element => {
      element.answers.forEach(element => {
        if (element.isChecked === true && element.rightAnswer === true) {
          counter += 1;
        }
      });  
    });
    this.proofService.resultTest(counter, this.len);
    this.router.navigateByUrl(`inicio/resultado`);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.proofService.cleanSubjects();
      this.subscription.unsubscribe();
    }
  }

}
