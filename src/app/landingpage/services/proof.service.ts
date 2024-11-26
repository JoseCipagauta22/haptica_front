import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question, User } from '../interfaces/proof';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProofService {

  private questionsDataSubject = new BehaviorSubject<Question[]>([]);
  public questions$ = this.questionsDataSubject.asObservable();

  private questionSubject = new BehaviorSubject<Question>(null);
  public question$ = this.questionSubject.asObservable();

  private userSubject = new BehaviorSubject<User>(null);
  public user$ = this.userSubject.asObservable();

  private resultSubject = new BehaviorSubject<boolean>(false);
  public result$ = this.resultSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getQuestions() {
    this.httpClient.get<Question[]>(`${environment.API_URL}/proof/proofs`).subscribe(data => {
      data.forEach(obj => {
        obj.answers.forEach(answerObj => { answerObj.isChecked = false});
      }) 
      this.questionsDataSubject.next(data);
    });
  }

  setQuestion(question: Question){
    this.questionSubject.next(question);
  }

  setUser(user: User){
    this.userSubject.next(user);
  }

  resultTest(counter: number, len: number){
    if (counter > len / 2) {
      this.resultSubject.next(true);
    }else{
      this.resultSubject.next(false);
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
