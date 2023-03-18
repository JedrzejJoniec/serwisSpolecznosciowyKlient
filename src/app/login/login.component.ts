import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {GetService} from "../services/get/get.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  showError: any = false;

  formData = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });


  constructor(private authService: AuthService, private router: Router, private getService: GetService) {
  }
  async submitForm() {

    const login = await this.authService
      .login(this.formData.get('username')?.value, this.formData.get('password')?.value)
    console.log(login + "ELO")
      if (login === "succesful") {
        this.getService.getLoggedInUser().subscribe((user) => {
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("id", String(user.id))
          window.location.reload();
        });
        this.router.navigate(['/allPosts'])

      }
      else {
        console.log("ELOOO")
        this.showError = true;
      }
      
  


  }
}
