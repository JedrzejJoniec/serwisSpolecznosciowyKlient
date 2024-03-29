import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.css']
})
export class ChangeProfileImageComponent {

  chosenImageToSend: any;
  @Input() chosenImage:any;

  constructor(private postService: PostService) {

  }

  newProfileImage(event: any) {
    let image = event.target.files[0];
    this.chosenImageToSend = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.chosenImage = fileReader.result;
    }
    fileReader.readAsDataURL(image);
  }

  changeProfileImage() {
    this.postService.changeProfileImage(this.chosenImageToSend);
  }
}
