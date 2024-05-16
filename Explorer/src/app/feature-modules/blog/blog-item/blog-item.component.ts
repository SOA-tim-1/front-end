import { Component, Input, OnInit } from '@angular/core';
import { Blog, Status } from '../model/blog.model';
import { Router } from '@angular/router';
import { FollowersService } from '../../layout/user-profile/followers-dialog/followers.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { IsFollowingMessage } from '../../layout/model/IsFoolowingMessage.model';

@Component({
  selector: 'xp-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
})
export class BlogItemComponent implements OnInit {
  @Input() blog: {
    id?: number;
    name: string;
    author: string;
    authorId : number,
    images: Array<string>;
    status?: Status;
  };
  cover: string = './assets/images/blog/';

  constructor(
    private router: Router,
    private followerService : FollowersService,
    private authService : AuthService,
  ) {}

  ngOnInit(): void {
    this.cover += this.blog.images[0];
  }

  openBlog() {
    // this.router.navigate(['blog/' + this.blog.id]);
    this.followerService.checkIfIsFollowingUser(this.authService.user$.getValue().id, this.blog.authorId).subscribe({
      next : (isFollowing : IsFollowingMessage) =>
        {
        if(isFollowing.exists){
          this.router.navigate(['blog/' + this.blog.id]);
        }else{
          this.router.navigate(['follow-blog-author/' + this.blog.id]);
        }
      }
    })
    
  }
}
