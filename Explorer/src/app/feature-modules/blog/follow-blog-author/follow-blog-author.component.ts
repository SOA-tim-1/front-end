import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../model/blog.model';
import { FollowersService } from '../../layout/user-profile/followers-dialog/followers.service';
import { Followers } from '../../layout/user-profile/followers-dialog/followers.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-follow-blog-author',
  templateUrl: './follow-blog-author.component.html',
  styleUrls: ['./follow-blog-author.component.css']
})
export class FollowBlogAuthorComponent {

  blogId: number;
  blog : Blog

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private blogService : BlogService,
    private followersService : FollowersService,
    private authService : AuthService,
  ){}



  ngOnInit(){
    this.blogId = Number(this.route.snapshot.paramMap.get('id')) || -1;
    this.blogService.getBlogById(this.blogId).subscribe({
      next : (blog : Blog)=>{
        this.blog = blog;
      }
    })
  }


  goBack(){
    this.router.navigate(['blog/']);
  }

  follow(){
    
    const newFollower: Followers = {
      followedId: this.blog.authorId,
      followingId: this.authService.user$.getValue().id,
  };

    this.followersService.createFollower(newFollower).subscribe({
      next : () =>{
        this.router.navigate(['blog/' + this.blogId]);
      }
    })
    
  }

}
