import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GetService, User } from 'src/app/services/get/get.service';
import { PostService } from 'src/app/services/post/post.service';
import { PostsActionsService } from 'src/app/services/posts-actions/posts-actions.service';
import { MessagesUserProfileSharedService } from 'src/app/services/sharedMessagesUserProfile/messages-user-profile-shared.service';
import {PostsComponent} from "../posts.component";



@Component({
  selector: 'app-user',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends PostsActionsService implements OnInit {
  username:any = '';
  user:User =  {id: 0, username: '', image:null, followed: false};;
  image: any;

  constructor(protected override route:ActivatedRoute, protected override getService: GetService, protected override postService: PostService, protected override router: Router, private messagesUserProfileSharedService : MessagesUserProfileSharedService){
      super(postService, router, getService, route);
  }

  override createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.user.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  
  showChat(username: string) {
    this.messagesUserProfileSharedService.buttonClickSubject.next(username);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.getService.getUser(this.username).subscribe(user => {
        this.user = user;
        this.getService.getUserImage(this.user.id).subscribe(image => {
          this.createImageFromBlob(image)
        });
      }) 
    })




  
}
}
