import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../interfaces/proof';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProofService {

  private questionsDataSubject = new BehaviorSubject<Question[]>([]);
  public questions$ = this.questionsDataSubject.asObservable();

  private questionSubject = new BehaviorSubject<Question>(null);
  public question$ = this.questionSubject.asObservable();

  private resultSubject = new BehaviorSubject<boolean>(false);
  public result$ = this.resultSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getQuestions() {
    // this.httpClient.get<Question[]>('http://localhost:3000/proof/proofs').subscribe(data => {

    //   data.forEach(obj => {
    //     obj.answers.forEach(answerObj => { answerObj.isChecked = false});
    //   }) 

    //   this.questionsDataSubject.next(data);
    // });

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
      'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    });

    this.httpClient.get<Question[]>('https://8aff-191-156-177-139.ngrok-free.app/proof/proofs', {headers}).subscribe(data => {

      data.forEach(obj => {
        obj.answers.forEach(answerObj => { answerObj.isChecked = false});
      }) 

      this.questionsDataSubject.next(data);
    });

    // const headers = new HttpHeaders({
    //   'ngrok-skip-browser-warning': 'true', // Añade la cabecera personalizada
    //   'Content-Type': 'application/json'
    //   // 'User-Agent': 'CustomUserAgent/1.0'   // O usa un User-Agent personalizado
    // });

    // this.httpClient.get<Category[]>('https://0f35-2803-17a0-1014-7e-80a-4d2a-6b8c-c267.ngrok-free.app/categories', {headers}).subscribe(data => {
    //   this.categoriesDataSubject.next(data);
    // });
  }

  setQuestion(question: Question){
    this.questionSubject.next(question);
  }

  resultTest(counter: number, len: number){
    if (counter > len / 2) {
      this.resultSubject.next(true);
    }
  }

  cleanSubjects(){
    this.questionSubject.next(null);
    this.questionsDataSubject.next([]);
  }
  
  cleanResult(){
    this.resultSubject.next(false);
  }
}
