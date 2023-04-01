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
  
  async addPost(body:string) {
    this.loadingService.setLoading(true);
    const addPostStatus =  await this.postService.addPost(body, this.imageToSend);
    if (addPostStatus.status === 200) {
      this.loadingService.setLoading(false);
      window.location.reload()
    }
   
  }
 
}
