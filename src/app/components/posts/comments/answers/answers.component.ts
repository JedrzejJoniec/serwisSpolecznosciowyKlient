import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/model/post-model';
import { Reaction } from 'src/app/model/reaction-model';
import { PostService } from 'src/app/services/post/post.service';
import { PostsComponent } from '../../posts.component';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['../../posts.component.css']
})
export class AnswersComponent extends PostsComponent{

  @Input() comment: any;
  @Output() answerInEdit = new EventEmitter<Post>()
  @Output() answerReactions = new EventEmitter<Reaction[]>()
  @Output() answerImageEdit = new EventEmitter<any>()

  sendAnswer(comment: Post) {
    this.answerInEdit.emit(comment) 
  }
  sendAnswerReactions(reactions: Reaction[]) {
    this.answerReactions.emit(reactions) 
  }
  sendAnswerImage(image: any[]) {
    this.answerImageEdit.emit(image) 
  }
  override ngOnInit(): void {
    
  }
}
