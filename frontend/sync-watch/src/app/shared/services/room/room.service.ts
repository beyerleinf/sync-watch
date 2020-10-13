import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'sync-watch/src/environments/environment';
import { Room } from '../../models/room';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient, private socket: Socket) {}

  createRoom() {
    return this.http.post<Room>(`${environment.serverUrl}/rooms`, {});
  }

  getRoom(id: string) {
    return this.http.get<Room>(`${environment.serverUrl}/rooms/${id}`, {});
  }

  joinRoom(id: string) {
    this.socket.emit('joinRoom', { id });
  }
}
