import { Component } from '@angular/core';
import {PostsComponent} from "../posts.component";


@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent extends PostsComponent{


  choseImage(event: any) {
    let image = event.target.files[0];
    this.imageToSend = event.target.files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.image = fileReader.result;
    }
    fileReader.readAsDataURL(image);
  }
  
  addPost(body:string) {
    this.postService.addPost(body, this.imageToSend);
  }
 
  reload () {
    window.location.reload();
  }
}
