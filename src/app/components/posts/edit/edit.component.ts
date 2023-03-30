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
  imageToSend: any = null;
  
  ngOnChanges() {
    
    this.textAreaText = this.bodyInEdit;
  }


  choseImage(event: any) {
    let image = event.target.files[0];
    this.imageToSend = event.target.files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.image = fileReader.result;
    }
    fileReader.readAsDataURL(image);
  }

  edit(body: string) {
    console.log(this.image)
    console.log(this.imageToSend)
    if((this.image === null && this.imageToSend !== undefined) || (this.image === null && this.imageToSend === undefined) || (this.image !== null && this.imageToSend !== undefined) ){
  
      this.postService.edit(body, this.postId, this.imageToSend);
    }

    

    

  }
  reload () {
    window.location.reload();
  }

}
