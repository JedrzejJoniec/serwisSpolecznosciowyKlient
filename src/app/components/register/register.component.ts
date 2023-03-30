import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorPassword: boolean = false;
  errorUsername: boolean = false;
  errorEmptyFields: boolean = false;
  registerCompleted: boolean = false;

  formData = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    passwordRepeat: new FormControl(null, Validators.required)
  });


  constructor(private authService: AuthService, private router: Router, private postService: PostService) {
  }
  async submitForm() {
    this.registerCompleted = false;
    this.errorEmptyFields = false;
    this.errorPassword = false;
    this.errorUsername = false;
    if (this.formData.get('password')?.value === null || this.formData.get('passwordRepeat')?.value == null || this.formData.get('username')?.value == null) {
        this.errorEmptyFields = true;
    }
    else if(this.formData.get('password')?.value === this.formData.get('passwordRepeat')?.value) {
      let registerFetch = await this.postService.register(this.formData.get('username')?.value, this.formData.get('password')?.value)
      if (registerFetch.status === 406) {
        this.errorUsername = true;
      }
      else if (registerFetch.status === 200){
        this.registerCompleted = true;
        this.errorEmptyFields = false;
        this.errorPassword = false;
        this.errorUsername = false;
      }
    }
    else {
      this.errorPassword = true;
    }

  }

}
