import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { NotificationModel } from './notification.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getNotifications(): Observable<PagedResults<NotificationModel>> {
    return this.http.get<PagedResults<NotificationModel>>(
      environment.apiHost + 'notifications/users'
    );
  }

  updateNotification(
    notification: NotificationModel
  ): Observable<NotificationModel> {
    return this.http.put<NotificationModel>(
      environment.apiHost + 'notifications/users/' + notification.id,
      notification
    );
  }

  createNotification(
    notification: NotificationModel
  ): Observable<NotificationModel> {
    return this.http.post<NotificationModel>(
      environment.apiHost + 'notifications/users',
      notification
    );
  }
}
