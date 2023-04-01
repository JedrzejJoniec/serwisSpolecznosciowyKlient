import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(private postService: PostService, private loadingService: LoaderService) {}


  @Input() image: any;
  @Input() bodyInEdit: any;
  @Input() postId: any;
  @Input() ViewOption: any;
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

  async edit(body: string) {
    console.log(this.image)
    console.log(this.imageToSend)
    if(this.bodyInEdit != body || this.imageToSend != null || this.image === null){
      this.loadingService.setLoading(true);
      let changeImage = true;
      if (this.image != null && this.imageToSend === null){
        changeImage = false;
      }
      const editStatus = await this.postService.edit(body, this.postId, this.imageToSend, changeImage);
      if (editStatus.status === 200) {
        this.loadingService.setLoading(false);
        window.location.reload();
      }
    }

    
  }

}
