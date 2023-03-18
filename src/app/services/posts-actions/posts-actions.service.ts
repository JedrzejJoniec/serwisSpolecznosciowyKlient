import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService, Post, User } from '../get/get.service';
import { PostService } from '../post/post.service';

@Injectable({
  providedIn: 'root'
})
export class PostsActionsService {

  userId: any = Number(sessionStorage.getItem("id"));

  constructor(protected postService: PostService, protected router:Router, protected getService: GetService, protected route: ActivatedRoute) { }

  sendNotification(post: any, type:String, typeOfNotificatedPost:String) {
    if (post.username != sessionStorage.getItem("username")) {
      if ((type === 'like' && post.liked) || type === 'comment' || type === 'post') {
        this.postService.addNotification(post.username, type, post.id, typeOfNotificatedPost);
      }
    }
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
      console.log("USUWAM")
      this.postService.deleteBlockedUserNotifications(user.username);
      this.postService.deleteChatWithBlockedUser(user.username);
      this.router.navigateByUrl("/allPosts");
    }
  }

  removePost(id: any){
    this.postService.removePost(id).subscribe(value => {
    })
    window.location.reload();
  }

  like(post:Post) {
    if (!post.liked) {
      this.addLikeToLikes(post);
      this.postService.addLike(post.id).subscribe(value => {
      });
    }
    else {
      this.removeLikeFromLikes(post);
      this.postService.removeLike(post.id).subscribe(value => {
      });
    }
  }
  addLikeToLikes(post:Post) {
    const now = new Date();
    post.reactions.push({ id: 1, user: {id: this.userId, username: 'jedo8', image: null, followed: false}, postId: 1, userImage: null, date: this.formatDate(now)})
    this.getService.getUserImage(9).subscribe(userImage => {
      this.createUserImageFromBlob(userImage, post.reactions[post.reactions.length - 1]);
    })
    post.liked = !post.liked;
  }

  removeLikeFromLikes(post:Post) {
    post.reactions.pop();
    post.liked = !post.liked;
  }

  showComments(post: any){
    if (post.comments.length != 0) {
      post.showComments = !post.showComments;
    }
  }
  
  showAddComment(post: any){
    post.showAddComment = !post.showAddComment;
  }

  createImageFromBlob(image: Blob, post: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      post.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  createUserImageFromBlob(image: Blob, post: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      post.userImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
      ].join(':')
    );
  }
}
