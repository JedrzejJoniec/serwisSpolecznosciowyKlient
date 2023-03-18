import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PostService} from "../post/post.service";
import {BehaviorSubject} from "rxjs";
import {GetService} from "../get/get.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private postService: PostService, private getService: GetService) {
    const token = sessionStorage.getItem("token");
    this._isLoggedIn$.next(!!token);
  }

  
  async login(username: any, password: any) {
    const fetchLogin =  await this.postService.login(username, password);
    if (fetchLogin.status === 403) {
      console.log("BLAD")
      return "unsuccesful";
    }
    else {
     let token = await fetchLogin.text()
     console.log(await token + "TOKEN")
     this._isLoggedIn$.next(true);
     sessionStorage.setItem("token", token);
     return "succesful";
    }
 

  }
  
  isLoggedIn(){
    return this.isLoggedIn$;


  }
}

