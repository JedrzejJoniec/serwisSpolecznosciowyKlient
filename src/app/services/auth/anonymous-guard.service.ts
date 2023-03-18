import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuardService {

  logged : any = new BehaviorSubject<boolean>(false).asObservable();

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, router: Router): Observable<boolean> {

    this.authService.isLoggedIn().subscribe(value => {
      if (!value) {
        this.logged = new BehaviorSubject<boolean>(true).asObservable();
      }
      else {
        this.router.navigate(['/allPosts'])
      }
    })
    return this.logged;

  }
}
