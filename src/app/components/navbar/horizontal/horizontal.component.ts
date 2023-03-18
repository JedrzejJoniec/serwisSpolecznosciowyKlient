import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { GetService, Message, Notification } from "src/app/services/get/get.service";
import { PostService } from "src/app/services/post/post.service";


@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.css']
})
export class HorizontalComponent {

  @Input() notification: Notification;
  @Input() message: Message;
  notifications: Array<Notification> = [];
  unSeen: number = 0;
  profileImage : any;
  chosenImage: any;
  chosenImageToSend: any;
  @Input() showChatWindow: any;
  
  constructor(private getService: GetService, private authService: AuthService, private postService: PostService, private router: Router){}


  ngOnInit(): void {
    this.getService.getNotifications().subscribe((notifications: Array<Notification>) => {
      this.notifications = notifications;
      this.countUnSeen();
    })
    let id = sessionStorage.getItem("id");
    this.getService.getUserImage(id).subscribe(userImage => {
      this.createImageFromBlob(userImage);
    })
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if( changes['notification'] && changes['notification'].previousValue != changes['notification'].currentValue ) {
      this.notifications.unshift(this.notification);
      this.unSeen++;
    }

 
  }

  countUnSeen() {
    for (let notification of this.notifications) {
      if (!notification.seen) {
        this.unSeen++;
      }
    }
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.profileImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  search(event:any) {
    console.log(event.target.value + " eloooo");
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/search', event.target.value]);
    });

  }
  setSeen() {
    this.postService.setSeen();
  }
  setSeenMessages(author:string | null) {
    this.postService.setSeenMessages(author);
  }
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
    this.authService._isLoggedIn$.next(false);
  }
  getUsername() {
    return sessionStorage.getItem('username');
  }
  newProfileImage(event: any) {
    let image = event.target.files[0];
    this.chosenImageToSend = event.target.files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.chosenImage = fileReader.result;
    }
    fileReader.readAsDataURL(image);
  }
}
