import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post, Reaction } from 'src/app/services/get/get.service';
import { PostsComponent } from '../posts.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['../posts.component.css']
})
export class CommentsComponent extends PostsComponent{
  @Input() post: any;
  @Output() commentInEdit = new EventEmitter<Post>()
  @Output() commentReactions = new EventEmitter<Reaction[]>()
  @Output() commentImageEdit = new EventEmitter<any>()

  sendComment(comment: Post) {
    this.commentInEdit.emit(comment) 
  }
  sendCommentReactions(reactions: Reaction[]) {
    this.commentReactions.emit(reactions) 
  }
  sendCommentImage(image: any) {
    this.commentImageEdit.emit(image) 
  }
  override ngOnInit(): void {
    
  }

}
