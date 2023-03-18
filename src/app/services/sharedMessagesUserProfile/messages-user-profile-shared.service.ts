import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagesUserProfileSharedService {
  
  buttonClickSubject: Subject<string> = new BehaviorSubject("");

  buttonClick: Observable<string> = this.buttonClickSubject.asObservable();

  constructor() { }
  
}
