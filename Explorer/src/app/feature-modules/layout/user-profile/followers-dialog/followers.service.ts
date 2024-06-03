import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Followers } from './followers.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { environment, gRPCenv, goFollowerEnviroment } from 'src/env/environment';
import { IsFollowingMessage } from '../../model/IsFoolowingMessage.model';
import { SuggestionsMessage } from '../../model/SuggestionsMessage.model';
import { FollowersMessage } from '../../model/FollowersMessage.model';
import { FollowsMessage } from '../../model/FollowsMessage.model';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {

  constructor(private http: HttpClient, private authService : AuthService) { }

  // getFollowers() : Observable<PagedResults<Followers>> {
  //   return this.http.get<PagedResults<Followers>>(environment.apiHost + 'followers/users');
  // } 

  getFollowers(id : number) : Observable<FollowersMessage> {
    return this.http.get<FollowersMessage>(gRPCenv.apiHost + 'follower/get-followers/' + id);
  } 

  getFollows(id : number) : Observable<FollowsMessage> {
    return this.http.get<FollowsMessage>(gRPCenv.apiHost + 'follower/get-follows/' + id);
  }
  
  checkIfIsFollowingUser(followingId : number, followedId: number) : Observable<IsFollowingMessage>{
    return this.http.get<IsFollowingMessage>(gRPCenv.apiHost + "follower/check-following/" + followingId + "/" + followedId)
  }

  getSuggestedUsersIds(loggedUserId : number): Observable<SuggestionsMessage>{
    return this.http.get<SuggestionsMessage>(gRPCenv.apiHost + "follower/get-suggestions/" + loggedUserId);
  }

  createFollower(follower:Followers) : Observable<Followers> {
    return this.http.post<Followers>(gRPCenv.apiHost + 'follower/follow-connection', follower);
  }

  // createFollower(follower:Followers) : Observable<Followers> {
  //   return this.http.post<Followers>(environment.apiHost + 'followers/users',follower);
  // }

  deleteFollower(followedId: number,followingId:number): Observable<Followers> {
    return this.http.delete<Followers>(gRPCenv.apiHost + 'follower/delete-follow-connection/' + followingId + "/" + followedId);
  }

  // deleteFollower(followedId: number,followingId:number): Observable<Followers> {
  //   return this.http.delete<Followers>(environment.apiHost + 'followers/users/' + followedId +'/' + followingId);
  // }

  // getFollowerById(followedId: number,followingId:number) : Observable<Followers>{
  //   return this.http.get<Followers>(environment.apiHost + 'followers/users/GetFollowersById/' + followedId +'/' + followingId);
  // }


  // getNotFollowing(loggedUserId: number): Observable<User[]> {
  //   return this.http.get<User[]>(environment.apiHost + 'users/allUsers/NotFollowing/' + loggedUserId);
  // }


}
 