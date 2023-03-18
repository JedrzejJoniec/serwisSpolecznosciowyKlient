import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  
  constructor(private postService: PostService) {

  }
  
  changePassword(password:string, password2:string) {
    if (password === password2) {
      this.postService.changePassword(password);
    }
  }
}
