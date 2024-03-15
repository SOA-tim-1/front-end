import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Checkpoint } from './model/checkpoint.model';

@Injectable({
  providedIn: 'root'
})
export class CheckpointService {

  constructor(private http: HttpClient) { }


  addCheckpoint(tourId : number, checkpoint : Checkpoint): Observable<void> {
    // return this.http.post<void>('https://localhost:44333/api/tour/addCheckpoint/', checkpoint);
    return this.http.post<void>("http://localhost:8090/checkpoint",checkpoint)
  }

  // getCheckpoints(id : number) : Observable<PagedResults<Checkpoint>> {
  //   return this.http.get<PagedResults<Checkpoint>>('https://localhost:44333/api/tour/getCheckpoints/' + id);
  // }

  getCheckpoints(id : number) : Observable<Checkpoint[]> {
    return this.http.get<Checkpoint[]>('http://localhost:8090/checkpoint/tour/' + id);
  }

  

  getCompositeTourCheckpoints(compositeTourId : number) : Observable<PagedResults<Checkpoint>> {
    return this.http.get<PagedResults<Checkpoint>>('https://localhost:44333/api/compositetour/getCheckpoints/' + compositeTourId);
  }

  editCheckpoint(checkpoint: Checkpoint) : Observable<Checkpoint> {
    return this.http.put<Checkpoint>('https://localhost:44333/api/tour/updateCheckpoint', checkpoint);
  }

  deleteCheckpoint(id: number) : Observable<void> {
    return this.http.delete<void>('https://localhost:44333/api/tour/deleteCheckpoint/' + id);
  }

}