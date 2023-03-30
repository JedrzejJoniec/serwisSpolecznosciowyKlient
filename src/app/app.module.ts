import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/posts/user-profile/user-profile.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import {LoginGuardService} from "./services/auth/login-guard.service";
import {AuthService} from "./services/auth/auth.service";
import {AuthInterceptor} from "./auth.interceptor";
import {AnonymousGuardService} from "./services/auth/anonymous-guard.service";
import { EditComponent } from './components/posts/edit/edit.component';
import { PostReactionsComponent } from './components/posts/post-reactions/post-reactions.component';
import { ImageComponent } from './components/posts/image/image.component';
import { AnswersComponent } from './components/posts/comments/answers/answers.component';
import { CommentsComponent } from './components/posts/comments/comments.component';
import { VerticalComponent } from './components/navbar/vertical/vertical.component';
import { HorizontalComponent } from './components/navbar/horizontal/horizontal.component';
import { MessagesComponent } from './components/navbar/horizontal/messages/messages.component';
import { ChangePasswordComponent } from './components/navbar/horizontal/change-password/change-password.component';
import { ChangeProfileImageComponent } from './components/navbar/horizontal/change-profile-image/change-profile-image.component';
import { RegisterComponent } from './components/register/register.component';








const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AnonymousGuardService]},
  { path: 'allPosts', component: PostsComponent, canActivate: [LoginGuardService], data: { viewOption: 'allPosts' } }, 
  { path: 'user/:username', component: UserProfileComponent, canActivate: [LoginGuardService],  data: { viewOption: 'user' } },
  { path: 'post/:id', component: PostsComponent, canActivate: [LoginGuardService], data: { viewOption: 'post' } },
  { path: 'followedUsersPosts', component: PostsComponent, canActivate: [LoginGuardService], data: { viewOption: 'followedUsersPosts' } },
  { path: 'likedPosts', component: PostsComponent, canActivate: [LoginGuardService], data: { viewOption: 'likedPosts' } },
  { path: 'myProfile', component: PostsComponent, canActivate: [LoginGuardService], data: { viewOption: 'myProfile' } },
  { path: 'followedUsers', component: UsersComponent, canActivate: [LoginGuardService],  data: { viewOption: 'followedUsers' } },
  { path: 'search/:id', component: SearchComponent, canActivate: [LoginGuardService], data: { viewOption: 'search' } },
  {path: 'blockedUsers', component: UsersComponent, canActivate: [LoginGuardService], data: { viewOption: 'blockedUsers' } },
  {path: 'register', component: RegisterComponent, canActivate: [AnonymousGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    AddPostComponent,
    UsersComponent,
    UserProfileComponent,
    SearchComponent,
    LoginComponent,
    EditComponent,
    PostReactionsComponent,
    ImageComponent,
    AnswersComponent,
    CommentsComponent,
    VerticalComponent,
    HorizontalComponent,
    MessagesComponent,
    ChangePasswordComponent,
    ChangeProfileImageComponent,
    RegisterComponent,

  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule

    ],
    exports: [RouterModule],
  providers: [AuthService
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  

}
