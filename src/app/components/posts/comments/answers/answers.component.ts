import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post, Reaction } from 'src/app/services/get/get.service';
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
    console.log("w commencie" + comment.body)
  }
  sendAnswerReactions(reactions: Reaction[]) {
    this.answerReactions.emit(reactions) 
    console.log(reactions[0] + " REACTIN ANSWER")
  }
  sendAnswerImage(image: any[]) {
    this.answerImageEdit.emit(image) 
  }
  override ngOnInit(): void {
    
  }
}
