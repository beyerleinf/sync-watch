import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from 'sync-watch/src/environments/environment';
import { User } from '../../models';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient, private socket: Socket) {}

  // createRoom() {
  //   return this.http.post<Room>(`${environment.serverUrl}/rooms`, {});
  // }

  getRoom(id: string) {
    return this.http.get<Room>(`${environment.serverUrl}/rooms/${id}`, {});
  }

  joinRoom(id: string, name: string) {
    this.socket.emit('joinRoom', { id, name });
  }

  createRoom() {
    this.socket.emit('createRoom');
  }

  setVideo(id: string, videoId: string) {
    this.socket.emit('setVideo', { id, videoId });
  }

  playVideo(id: string) {
    this.socket.emit('playVideo', { id });
  }

  pauseVideo(id: string) {
    this.socket.emit('pauseVideo', { id });
  }

  videoSync(id: string, time: number) {
    this.socket.emit('videoSync', { id, time });
  }

  getUsers() {
    return new Observable<User[]>(subscriber => {
      this.socket.on('users', (users: User[]) => {
        subscriber.next(users);
      });
    });
  }

  getCurrentVideo() {
    return new Observable<string>(subscriber => {
      this.socket.on('currentVideo', (videoId: string) => {
        subscriber.next(videoId);
      });
    });
  }

  onRoomCreated() {
    return new Observable<string>(subscriber => {
      this.socket.on('roomCreated', data => {
        subscriber.next(data.id);
      });
    });
  }

  onPlayVideo() {
    return new Observable<void>(subscriber => {
      this.socket.on('playVideo', () => {
        subscriber.next();
      });
    });
  }

  onPauseVideo() {
    return new Observable<void>(subscriber => {
      this.socket.on('pauseVideo', () => {
        subscriber.next();
      });
    });
  }

  onVideoSync() {
    return new Observable<number>(subscriber => {
      this.socket.on('videoSync', ({ time }) => {
        subscriber.next(time);
      });
    });
  }
}
