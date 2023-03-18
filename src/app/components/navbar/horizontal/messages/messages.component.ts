import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetService, Message } from 'src/app/services/get/get.service';
import { PostService } from 'src/app/services/post/post.service';
import { MessagesUserProfileSharedService } from 'src/app/services/sharedMessagesUserProfile/messages-user-profile-shared.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  @ViewChild('box') private box: ElementRef;
  @ViewChild('messageContainer') private myScrollContainer: ElementRef;
  messagesNotifications: Array<Message> = [];
  messages: Array<Message> = [];
  @Input() message: Message;
  unSeenMessages: number = 0;
  receiver: string;
  usersInContacts: any = [];
  @Input() showChatWindow: any;
  
  constructor(private getService: GetService, private authService: AuthService, private postService: PostService, private router: Router, private messagesUserProfileSharedService : MessagesUserProfileSharedService){
    
    this.messagesUserProfileSharedService.buttonClick.subscribe(username => {
      if (this.box != undefined) {
      this.box.nativeElement.style.display = 'block';
      this.receiver = username; 
      this.getChatMessages(username); 
      this.scrollToBottom();
      }
    });
  
  }

  createUserImageFromBlob(image: Blob, user: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      user.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  ngOnChanges() {
    if (this.message.author != '') {
      this.messages.push(this.message);
      this.messagesNotifications.unshift(this.message);
      this.unSeenMessages++
    }

  }   
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  ngOnInit():void{
    this.getService.getUnSeenMessages().subscribe(messages => {
      this.unSeenMessages = messages.length
      this.messagesNotifications = messages;
    }
  )
  this.getService.getContacts().subscribe(contacts => {
    contacts.forEach(contact => {
      console.log(contact + " SIEMANO")
      this.getService.getUser(contact).subscribe(user => {
        this.getService.getUserImage(user.id).subscribe(userImage => {
          this.createUserImageFromBlob(userImage, user);
      })
      this.usersInContacts.push(user)
    })
    })
  })
   
  this.scrollToBottom();
  }

  addMessage(text: string) {
    let author = sessionStorage.getItem("username");
    if ( author === null) {
      author = "pusty";
    }
    let obj: Message =  {
      author: author,
      text: text,
      date: '',
      seen: false
    };
    if (this.messages === null) {
      this.messages = [];
    }
    this.messages.push(obj);
    this.postService.addMessage(this.receiver, text);
  }
  getChatMessages(member:string) {
    this.messages = [];
    this.getService.getChatMessages(member).subscribe(messages => {
      this.messages = messages;
    });
  }
  setSeenMessages(author:string | null) {
    this.postService.setSeenMessages(author);
  }
  sendNotificationMessage(text:string) {
    this.postService.addNotificationMessage(text, this.receiver);
  }
}
