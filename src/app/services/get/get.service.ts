import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsersComponent} from "../../components/users/users.component";

@Injectable({
  providedIn: 'root'
})
export class GetService {
  posts: Observable<Post[]> | undefined;


  constructor(private httpClient: HttpClient) {

  }

  public getLoggedInUser(): Observable<User> {

    return this.httpClient.get<User>('http://localhost:8080/loggedInUser')
  }

  public getPost(id:number): Observable<Post> {

    return this.httpClient.get<Post>('http://localhost:8080/post/' + id)
  }

  public getPosts(): Observable<Post[]> {

    return this.httpClient.get<Post[]>('http://localhost:8080/posts')
  }

  public getUser(username:string): Observable<User> {

    return this.httpClient.get<User>('http://localhost:8080/user/' + username)
  }


  public searchPosts(parameter:string): Observable<Post[]> {

    return this.httpClient.get<Post[]>('http://localhost:8080/search/posts/' + parameter)
  }

  public searchUsers(username:string): Observable<User[]> {

    return this.httpClient.get<User[]>('http://localhost:8080/search/users/' + username)
  }

  public getFollowedUsersPosts(): Observable<Post[]> {

    return this.httpClient.get<Post[]>('http://localhost:8080/followedUsersPosts')
  }
  public getBlockedUsers(): Observable<User[]> {

    return this.httpClient.get<User[]>('http://localhost:8080/blockedUsers')
  }
  public getLikedPosts(): Observable<Post[]> {

    return this.httpClient.get<Post[]>('http://localhost:8080/likedPosts')
  }
  public getMyPosts(): Observable<Post[]> {

    return this.httpClient.get<Post[]>('http://localhost:8080/myPosts')
  }
  public getUserPosts(username:any): Observable<Post[]> {

    return this.httpClient.get<Post[]>('http://localhost:8080/users/' + username)
  }
  public getPostImage(postId: number): Observable<Blob> {

    return this.httpClient.get('http://localhost:8080/post/' + postId + '/file/',{responseType: 'blob' })
  }
  public getUserImage2(userId: any) {
    return fetch("http://localhost:8080/user/" + userId + "/file/",{

      }
    )
  }
  public getUserImage(userId: any): Observable<Blob> {

    return this.httpClient.get('http://localhost:8080/user/' + userId + '/file/',{responseType: 'blob' })
  }
  public getFollowedUsers(): Observable<User[]> {

    return this.httpClient.get<User[]>('http://localhost:8080/followedUsers')
  }

  public getNotifications(): Observable<Notification[]> {

    return this.httpClient.get<Notification[]>('http://localhost:8081/notifications?username=' + sessionStorage.getItem("username"))
  }
  public getChatMessages(member:string): Observable<Message[]> {
    return this.httpClient.get<Message[]>('http://localhost:8083/chat?member1=' + sessionStorage.getItem("username") + "&member2=" + member)
  }
  public getUnSeenMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>('http://localhost:8083/getUnSeenMessages?username=' + sessionStorage.getItem("username"))
  }

  public getContacts(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:8083/contacts/' + sessionStorage.getItem("username"))
  }


}


export interface Reaction {
  id: number;
  user: User;
  postId: number;
  userImage: any;
  date: any;
}
export interface Comment {
  id: number;
  username: string;
  userId: number;
  comments: Comment[];
  reactions: Reaction[];
  hasImage: boolean;
  liked: boolean;
  body: string;
  image: any;
  userImage: any;
  showComments: boolean;
  showAddComment: boolean;
  loadedImage: any;
  date: any;
}

export interface Post {
  id: number;
  username: string;
  userId: number;
  comments: Comment[];
  reactions: Reaction[];
  hasImage: boolean;
  liked: boolean;
  body: string;
  image: any;
  userImage: any;
  showComments: boolean;
  showAddComment: boolean;
  loadedImage: any;
  date: any;

}
export interface User {
  id: number;
  username: string;
  image: any;
  followed: any;
}

export interface Notification {
  id: number;
  username: string;
  type: string;
  seen: boolean;
  author: string;
  date: any;
  postId: any;
  typeOfNotificatedPost: any;
}

export interface Message {
  author: string;
  text: string;
  date: any;
  seen: boolean;

}

