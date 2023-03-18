import {Component, OnInit} from '@angular/core';
import {GetService, Post, Reaction, User} from "../../services/get/get.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {PostService} from "../../services/post/post.service";
import {PostsComponent} from "../posts/posts.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit{

id: any;
users: User[] = [];

constructor(private route : ActivatedRoute) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

  }
}
