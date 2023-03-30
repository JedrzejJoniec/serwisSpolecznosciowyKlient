import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsersComponent} from "../../components/users/users.component";
import {environment} from "../../../environments/environment";
import { Reaction } from 'src/app/model/reaction-model';
import { Post } from 'src/app/model/post-model';
import { Message } from 'src/app/model/message-model';
import { User } from 'src/app/model/user-model';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  posts: Observable<Post[]>;
  postsUrl: string = environment.postsUrl;
  securityUrl: string = environment.securityUrl;
  brokerUrl: string = environment.brokerUrl;
  chatUrl: string = environment.chatUrl;

  constructor(private httpClient: HttpClient) {

  }

  public getLoggedInUser(): Observable<User> {

    return this.httpClient.get<User>(this.postsUrl + '/loggedInUser')
  }

  public getPost(id:number): Observable<Post> {

    return this.httpClient.get<Post>(this.postsUrl + '/post/' + id)
  }

  public getPosts(): Observable<Post[]> {

    return this.httpClient.get<Post[]>(this.postsUrl + '/posts')
  }

  public getUser(username:string): Observable<User> {

    return this.httpClient.get<User>(this.postsUrl + '/user/' + username)
  }


  public searchPosts(parameter:string): Observable<Post[]> {

    return this.httpClient.get<Post[]>(this.postsUrl + '/search/posts/' + parameter)
  }

  public searchUsers(username:string): Observable<User[]> {

    return this.httpClient.get<User[]>(this.postsUrl + '/search/users/' + username)
  }

  public getFollowedUsersPosts(): Observable<Post[]> {

    return this.httpClient.get<Post[]>(this.postsUrl + '/followedUsersPosts')
  }
  public getBlockedUsers(): Observable<User[]> {

    return this.httpClient.get<User[]>(this.postsUrl +  '/blockedUsers')
  }
  public getLikedPosts(): Observable<Post[]> {

    return this.httpClient.get<Post[]>(this.postsUrl + '/likedPosts')
  }
  public getMyPosts(): Observable<Post[]> {

    return this.httpClient.get<Post[]>(this.postsUrl + '/myPosts')
  }
  public getUserPosts(username:any): Observable<Post[]> {

    return this.httpClient.get<Post[]>(this.postsUrl + '/users/' + username)
  }
  public getPostImage(postId: number): Observable<Blob> {

    return this.httpClient.get(this.postsUrl + '/post/' + postId + '/file/',{responseType: 'blob' })
  }
  public getUserImage(userId: any): Observable<Blob> {

    return this.httpClient.get(this.postsUrl + '/user/' + userId + '/file/',{responseType: 'blob' })
  }
  public getFollowedUsers(): Observable<User[]> {

    return this.httpClient.get<User[]>(this.postsUrl + '/followedUsers')
  }

  public getNotifications(): Observable<Notification[]> {

    return this.httpClient.get<Notification[]>(this.brokerUrl + '/notifications?username=' + sessionStorage.getItem("username"))
  }
  public getChatMessages(member:string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.chatUrl + '/chat?member1=' + sessionStorage.getItem("username") + "&member2=" + member)
  }
  public getUnSeenMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.chatUrl + '/getUnSeenMessages?username=' + sessionStorage.getItem("username"))
  }

  public getContacts(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.chatUrl + '/contacts/' + sessionStorage.getItem("username"))
  }



}











