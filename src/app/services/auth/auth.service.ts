import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PostService} from "../post/post.service";
import {BehaviorSubject} from "rxjs";
import {GetService} from "../get/get.service";
import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private postService: PostService, private getService: GetService, protected loadingService: LoaderService) {
    const token = sessionStorage.getItem("token");
    this._isLoggedIn$.next(!!token);
  }

  
  async login(username: any, password: any) {
    this.loadingService.setLoading(true);
    const fetchLogin =  await this.postService.login(username, password);
    if (fetchLogin.status === 403) {
      this.loadingService.setLoading(false);
      return "unsuccesful";
    }
    else {
     let token = await fetchLogin.text()
     this._isLoggedIn$.next(true);
     sessionStorage.setItem("token", token);
     this.loadingService.setLoading(false);
     return "succesful";
    }
    
 

  }
  
  isLoggedIn(){
    return this.isLoggedIn$;


  }
}

