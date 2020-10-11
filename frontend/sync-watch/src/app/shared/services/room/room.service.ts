import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'sync-watch/src/environments/environment';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  createRoom() {
    return this.http.post<Room>(`${environment.serverUrl}/room`, {});
  }
}
