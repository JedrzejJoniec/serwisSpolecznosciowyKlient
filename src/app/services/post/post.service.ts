import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message, Post, User} from "../get/get.service";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Observable<Post[]> | undefined;

  token: any = localStorage.getItem("token");
  constructor(private httpClient: HttpClient) {
    this.token = localStorage.getItem("token");
  }

  public edit(body:string, id:any, image:File) {

    const formData = new FormData();
    formData.append('file', image);
    formData.append('body', body);
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }

    fetch("http://localhost:8080/myPosts/post/" + id,{
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
    fetch("http://localhost:8080/passwordChange",{
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
    fetch("http://localhost:8080/user/image/",{
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
    return fetch("http://localhost:8082/login",{
        method: 'POST',
        body: JSON.stringify(body)
      }
    )
  }
  public async register(username:any, password:any){

    const body = password;
    return fetch("http://localhost:8082/users/register/" + username,{
        method: 'POST',
        body: body
      }
    )
      
  }
  public addNotification(postAuthor:String, type:String, postId:number, object:String) {
    fetch("http://localhost:8081/addNotification?type=" + type + "&author=" +  sessionStorage.getItem("username") + "&username=" + postAuthor + "&id=" + postId + "&object=" + object, {
        method: 'POST',
      }
    )
  }

  public addNotificationMessage(text:String, receiver:string) {
    let author = sessionStorage.getItem("username");
    fetch("http://localhost:8081/addMessageNotification?text=" + text + "&author=" + author + "&receiver=" + receiver, {
        method: 'POST',
      }
    )
  }

  public addMessage(receiver:string, text:string) {
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    fetch('http://localhost:8083/rest/' + receiver + '/addMessage?author=' + sessionStorage.getItem("username"), {
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
    fetch("http://localhost:8081/notifications?username=" +  sessionStorage.getItem("username"), {
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
    fetch("http://localhost:8083/setMessagesSeen?author=" +  sessionStorage.getItem("username") + "&receiver=" + author, {
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
    fetch("http://localhost:8080/posts/file",{
      headers:{
        Authorization: token
      },
        method: 'POST',
        body: formData
      }
    )
  }
  public addLike(id:any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    let options = {
      headers: reqHeader
    };
    return this.httpClient.post<any>("http://localhost:8080/post/" + id + "/reactions", {});
  }

  public addComment(id:any, body:any, image:any){
    const formData = new FormData();
    formData.append('body', body);
    formData.append('file', image);
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    fetch("http://localhost:8080/post/" + id + "/comments",{
      headers:{
        Authorization: token
      },
        method: 'POST',
        body: formData
      }
    )
  }

  public removeLike(id:any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    let options = {
      headers: reqHeader
    };
    return this.httpClient.delete<any>("http://localhost:8080/post/" + id + "/reactions");
  }

  public removePost(id:any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    let options = {
      headers: reqHeader
    };
    return this.httpClient.delete<any>("http://localhost:8080/myPosts/post/" + id);
  }

  public deleteBlockedUserNotifications(blockedUser:string){
    let token = sessionStorage.getItem("token");
    if ( token === null) {
      token = "pusty";
    }
    fetch("http://localhost:8081/deleteNotifications/" + blockedUser,{
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
    fetch("http://localhost:8083/deleteChat/" + blockedUser,{
      headers:{
        Authorization: token
      },
        method: 'DELETE'
      }
    )
  }

  public followOrBlock(id:any, relation: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    let options = {
      headers: reqHeader
    };
    return this.httpClient.post<any>("http://localhost:8080/users/" + id, relation);
  }


  public unFollow(id:any): Observable<any> {

    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    let options = {
      headers: reqHeader
    };
    return this.httpClient.delete<any>("http://localhost:8080/users/" + id);
  }


}
