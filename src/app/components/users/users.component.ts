import { Component, Input } from '@angular/core';
import {GetService, User} from "../../services/get/get.service";
import {Location} from "@angular/common";
import {PostService} from "../../services/post/post.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: User[] = [];
  viewOption: any;
  @Input() id: any;

  constructor(protected getService: GetService, private postService: PostService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    this.viewOption = this.route.snapshot.data['viewOption'];

    switch(this.viewOption ) { 
      case 'followedUsers': { 
        this.getService.getFollowedUsers().subscribe(users => {
          this.users = users;
          this.users.forEach((user) => {
            this.getService.getUserImage(user.id).subscribe(userImage => {
              this.createImageFromBlob(userImage, user);
            })
          });
        });

      }
        break; 
      case 'blockedUsers': { 
        this.getService.getBlockedUsers().subscribe(users => {
          this.users = users;
          this.users.forEach((user) => {
            this.getService.getUserImage(user.id).subscribe(userImage => {
              this.createImageFromBlob(userImage, user);
            })
          });
        });
      }
        break;  
      case 'search': { 
        this.getService.searchUsers(this.id).subscribe(users => {
        this.users = users;
        this.users.forEach((user) => {
          this.getService.getUserImage(user.id).subscribe(userImage => {
            this.createImageFromBlob(userImage, user);
          })
        });
      });
      }
        break;  
    }
  }

  unBlock(id:number) {
    this.postService.unFollow(id).subscribe();
    window.location.reload();
  }
  followOrBlock(user: User, relation: string) {
    let id = user.id;
    if (user.followed && relation === 'follow') {
      this.postService.unFollow(id).subscribe();
    }
    else {
      this.postService.followOrBlock(id, relation).subscribe()
    }
    if (relation === 'block') {
      this.postService.deleteBlockedUserNotifications(user.username);
      this.postService.deleteChatWithBlockedUser(user.username);
      this.router.navigateByUrl("/allPosts");
    }
  }
  createImageFromBlob(image: Blob, user: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      user.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
