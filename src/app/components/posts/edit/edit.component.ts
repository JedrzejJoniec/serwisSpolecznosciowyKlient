import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(private postService: PostService) {}


  @Input() image: any;
  @Input() bodyInEdit: any;
  @Input() postId: any;
  textAreaText: any;
  imageToSend: any;
  
  ngOnChanges() {
    
    this.textAreaText = this.bodyInEdit;
    console.log(this.bodyInEdit + "BODYY w edit")
  }


  choseImage(event: any) {
    let image = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.image = fileReader.result;
    }
    fileReader.readAsDataURL(image);
  }

  edit(body: string) {
    console.log(body + "BODY");
    this.postService.edit(body, this.postId, this.imageToSend);
    window.location.reload();
  }

}
