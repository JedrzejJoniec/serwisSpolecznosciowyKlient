import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { Post } from 'src/app/model/post-model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsUrl: string = environment.postsUrl;
  securityUrl: string = environment.securityUrl;
  brokerUrl: string = environment.brokerUrl;
  chatUrl: string = environment.chatUrl;

  posts: Observable<Post[]>;

  token: any = localStorage.getItem("token");
  constructor(private httpClient: HttpClient) {
    this.token = localStorage.getItem("token");
  }

  public edit(body:string, id:any, image:File, changeImage: boolean) {

    const formData = new FormData();
    formData.append('file', image);
    formData.append('body', body);
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }

    return fetch(this.postsUrl + "/myPosts/post/" + id + "/" + changeImage,{
        headers:{
          Authorization: token
        },
        method: 'PUT',
        body: formData
      }
    )
  }


  public changePassword(body:string) {
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    fetch(this.postsUrl + "/passwordChange",{
      headers:{
        Authorization: token
      },
        method: 'PUT',
        body: body
      }
    )
  }


  public changeProfileImage(image:File) {
    const formData = new FormData();
    formData.append("file", image);
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    fetch(this.postsUrl + "/user/image/",{
        headers:{
          Authorization: token
        },
        method: 'POST',
        body: formData
      }
    )
  }

   public async login(username:string, password:string){

    const body = {
      username, password
    }
    return fetch(this.securityUrl + "/login",{
        method: 'POST',
        body: JSON.stringify(body)
      }
    )
  }
  public async register(username:any, password:any){

    const body = password;
    return fetch(this.securityUrl + "/users/register/" + username,{
        method: 'POST',
        body: body
      }
    )
      
  }
  public addNotification(postAuthor:String, type:String, postId:number, object:String) {
    fetch(this.brokerUrl + "/addNotification?type=" + type + "&author=" +  sessionStorage.getItem("username") + "&username=" + postAuthor + "&id=" + postId + "&object=" + object, {
        method: 'POST',
      }
    )
  }

  public addNotificationMessage(text:String, receiver:string) {
    let author = sessionStorage.getItem("username");
    fetch(this.brokerUrl +"/addMessageNotification?text=" + text + "&author=" + author + "&receiver=" + receiver, {
        method: 'POST',
      }
    )
  }

  public addMessage(receiver:string, text:string) {
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    fetch(this.chatUrl +'/rest/' + receiver + '/addMessage?author=' + sessionStorage.getItem("username"), {
      headers:{
        Authorization: token
      },
        method: 'POST',
        body: text
      }
    )
  }
  public setSeen() {
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    fetch(this.brokerUrl + "/notifications?username=" +  sessionStorage.getItem("username"), {
      headers:{
        Authorization: token
      },
        method: 'POST'
      }
    )
  }
  public setSeenMessages(author:string | null) {
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    fetch(this.chatUrl + "/setMessagesSeen?author=" +  sessionStorage.getItem("username") + "&receiver=" + author, {
      headers:{
        Authorization: token
      },
        method: 'POST'
      }
    )
  }

  
  public addPost(body:string, image:File) {

    const formData = new FormData();
    formData.append('file', image);
    formData.append('body', body);
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    return fetch(this.postsUrl + "/posts/file",{
      headers:{
        Authorization: token
      },
        method: 'POST',
        body: formData
      }
    )
  }
  public addLike(id:any): Observable<any> {
    console.log(this.postsUrl + "/post/" + id + "/reactions")
    return this.httpClient.post<any>(this.postsUrl + "/post/" + id + "/reactions", {});
  }

  public addComment(id:any, body:any, image:any){
    const formData = new FormData();
    formData.append('body', body);
    formData.append('file', image);
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    return fetch(this.postsUrl +"/post/" + id + "/comments",{
      headers:{
        Authorization: token
      },
        method: 'POST',
        body: formData
      }
    )
  }

  public removeLike(id:any): Observable<any> {
    console.log(this.postsUrl + "/post/" + id + "/reactions")
    return this.httpClient.delete<any>(this.postsUrl + "/post/" + id + "/reactions");
  }

  public removePost(id:any): Observable<any> {
    return this.httpClient.delete<any>(this.postsUrl +"/myPosts/post/" + id, {observe: 'response'});
  }

  public deleteBlockedUserNotifications(blockedUser:string){
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    fetch(this.brokerUrl + "/deleteNotifications/" + blockedUser,{
      headers:{
        Authorization: token
      },
        method: 'DELETE'
      }
    )
  }

  public deleteChatWithBlockedUser(blockedUser:string){
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    return fetch(this.chatUrl + "/deleteChat/" + blockedUser,{
      headers:{
        Authorization: token
      },
        method: 'DELETE'
      }
    )
  }

  public followOrBlock(id:any, relation: string): Observable<any> {

    return this.httpClient.post<any>(this.postsUrl +"/users/" + id, relation, {observe: 'response'});
  }


  public unFollow(id:any): Observable<any> {

    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    let options = {
      headers: reqHeader
    };
    return this.httpClient.delete<any>(this.postsUrl + "/users/" + id);
  }


}
