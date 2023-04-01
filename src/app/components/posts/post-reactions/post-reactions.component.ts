import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsComponent } from '../posts.component';
import { GetService} from '../../../services/get/get.service';
import { PostService } from '../../../services/post/post.service';
import { PostsActionsService } from 'src/app/services/posts-actions/posts-actions.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-post-reactions',
  templateUrl: './post-reactions.component.html',
  styleUrls: ['./post-reactions.component.css']
})
export class PostReactionsComponent extends PostsActionsService{

  constructor(protected override route:ActivatedRoute, protected override loadingService: LoaderService,protected override getService: GetService, protected override postService: PostService, protected override router: Router){
    super(postService, router, getService, route, loadingService);
}

@Input() reactions: any;

}
