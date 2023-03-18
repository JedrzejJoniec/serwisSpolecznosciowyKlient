import {AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {GetService, Message, Notification, User} from "./services/get/get.service";
import {PostService} from "./services/post/post.service";
import {AuthService} from "./services/auth/auth.service";
import * as SockJS from "sockjs-client"
import * as Stomp from "stompjs"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  notification: Notification;
  message: Message = {  author: '',
    text: '',
    date: null,
    seen: false};
  title = 'angularproject';
  username: any = sessionStorage.getItem("username");

  constructor(private getService: GetService ,private router: Router, private postService: PostService, public authService: AuthService) {

  }

  ngOnInit() {

    let sock = new SockJS("http://localhost:8081/stomp");
// Create a new StompClient object with the WebSocket endpoint
    let client = Stomp.over(sock);
      // Start the STOMP communications, provide a callback for when the CONNECT frame arrives.
      client.connect({}, (frame: any) => {
      // Subscribe to "/topic/messages". Whenever a message arrives add the text in a list-item element in the unordered list.
      client.subscribe("/topic/"+ sessionStorage.getItem("username"), (payload: { body: string; }) => {
        let obj: any = JSON.parse(payload.body);
        if (obj.type === "like" || obj.type === "comment") {
          this.notification = obj;
        }
        else {
          if (JSON.parse(payload.body).author !== sessionStorage.getItem("username")) {
            this.message = JSON.parse(payload.body);
            
          }
        }
      });

    });

    fetch("http://localhost:8081/createQueue?username=" + sessionStorage.getItem("username"),{
        method: 'POST',
      }
    ).then(response => console.log(response.text()))
  
  }

}

