import {Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {GetService} from "../../services/get/get.service";
import {PostService} from "../../services/post/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import { PostReactionsComponent } from 'src/app/components/posts/post-reactions/post-reactions.component';
import { PostsActionsService } from 'src/app/services/posts-actions/posts-actions.service';
import { Post } from 'src/app/model/post-model';
import { Reaction } from 'src/app/model/reaction-model';
import { Comment } from 'src/app/model/comment-model';
import { LoaderService } from 'src/app/services/loader.service';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent extends PostsActionsService implements OnInit{

  posts: Post[] = [];
  @Input() imageEdit: any;
  postId: any;
  bodyInEdit: any;
  image: any;
  imageToSend: File;
  postReactions!: PostReactionsComponent
  isBeingEdited: boolean;
  @Input() userProfileName: any;
  @Input() id: any;

  ngOnInit(): void {
    this.viewOption = this.route.snapshot.data['viewOption'];
    switch(this.viewOption) { 
      case 'allPosts': { 
        this.getService.getPosts().subscribe(posts => {
          this.loadPosts(posts);
        });
      }
        break; 
      case 'likedPosts': { 
        this.getService.getLikedPosts().subscribe(posts => {
          this.loadPosts(posts);
        });

      }
        break;  

      case 'user': {
        this.getService.getUserPosts(this.userProfileName).subscribe(posts => {
          this.loadPosts(posts);
      })
      }
      break;  
      case 'followedUsersPosts': { 
        this.getService.getFollowedUsersPosts().subscribe(posts => {
          this.loadPosts(posts);
        });
      }
      break;  

      case 'search': { 
        this.getService.searchPosts(this.id).subscribe(posts => {
          this.loadPosts(posts);
        });

      }
      break;  
  
      case 'post': { 
        this.route.params.subscribe(params => {
          this.getService.getPost(params['id']).subscribe(post => {
            this.posts =[];
            this.posts.push(post);
            this.loadPosts(this.posts);

          });
        });
      }
      break; 
      } 
    }
    
  ngOnChanges() {
    switch(this.viewOption){
      case 'user': {
        this.getService.getUserPosts(this.userProfileName).subscribe(posts => {
          this.loadPosts(posts);
        })
      }
      break;
    }
  }

  loadPosts(posts: Post[]) {
    this.posts = [];
    this.posts = posts;
    this.posts.forEach((post) => {
      this.loadImagesAndReactions(post);
      this.loadComments(post);
    });
  }
  loadComments(post: Post) {
    post.comments.forEach((comment) => {
      this.loadImagesAndReactions(comment);
      this.loadAnswers(comment);
    });
  }
  loadAnswers(comment : any) {
    comment.comments.forEach((answer: any) => {
      this.loadImagesAndReactions(answer);
    });
  }
  loadImagesAndReactions(post: any) {
    this.loadImages(post);
    this.loadUserReactions(post);
  }
  loadUserReactions(post: any) {
    post.reactions.forEach((reaction: Reaction) => {
      this.getService.getUserImage(reaction.user.id).subscribe(userImage => {
        this.createUserImageFromBlob(userImage, reaction);
      });
    });
  }  

  loadImages(post: any) {
    this.getService.getUserImage(post.userId).subscribe(userImage => {
      this.createUserImageFromBlob(userImage, post);
    })
    if (post.hasImage) {
      this.getService.getPostImage(post.id).subscribe(image => {
        this.createImageFromBlob(image, post)
      });
    }
  }

  setImage(image: any) {
    this.imageEdit = image;
  }

  async addComment(post:any, body:any) {
    this.loadingService.setLoading(true);
    const addCommentStatus = await this.postService.addComment(post.id, body, this.imageToSend);
    if (addCommentStatus.status === 200) {
      this.loadingService.setLoading(false);
      window.location.reload()
    }

  }

  loadImage(event: any, post: any){
    let image = event.target.files[0];
    this.imageToSend = event.target.files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = () => {
      post.loadedImage = fileReader.result;
    }
    fileReader.readAsDataURL(image);
  }

  showReactions(reactions:any) {
    this.postReactions = reactions;
  }

  addToEdit(post: any) {
    this.image = post.image;
    this.bodyInEdit = post.body;
    this.postId = post.id;
  }
}
