import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { Observable } from 'rxjs';
import { User } from 'sync-watch/src/app/shared/models';
import { RoomService } from 'sync-watch/src/app/shared/services';
import { JoinRoomDialogComponent } from '../dialogs';

@Component({
  selector: 'syncw-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  private syncInterval: any;

  videoUrlInput: string = 'https://www.youtube.com/watch?v=2u_pZ-SgACk';
  roomId: string;
  users$: Observable<User[]>;
  currentVideoId: string;

  currentState = '';

  @ViewChild(YouTubePlayer) player: YouTubePlayer;

  constructor(
    private room: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params.id;
    this.users$ = this.room.getUsers();

    this.room.getCurrentVideo().subscribe(videoId => {
      console.log('update video');
      this.currentVideoId = videoId;
      console.log(this.player.getDuration());
    });

    this.room.onPlayVideo().subscribe(() => {
      console.log('onPlayVideo');

      if (this.player.getPlayerState() !== 1) {
        this.player.playVideo();
      }
    });

    this.room.onPauseVideo().subscribe(() => {
      console.log('onPauseVideo');

      if (this.player.getPlayerState() !== 2) {
        this.player.pauseVideo();
      }
    });

    this.room.onVideoSync().subscribe(time => {
      console.log('onSyncVideo', time);
      const currenTime = this.player.getCurrentTime();

      if (currenTime < time - 1 || currenTime > time + 1) {
        this.player.seekTo(time, true);
      }
    });

    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.room.getRoom(this.roomId).subscribe(
      room => {
        const dialogRef = this.dialog.open(JoinRoomDialogComponent, { width: '33%', hasBackdrop: true });
        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.room.joinRoom(room.id, dialogResult.name);
          } else {
            this.router.navigate(['/']);
          }
        });
      },
      error => {
        if (!error.exists) {
          this.router.navigate(['/'], { queryParams: { e: 'notfound' } });
        }
      }
    );
  }

  setVideo() {
    this.room.setVideo(this.roomId, new URL(this.videoUrlInput).searchParams.get('v'));
  }

  onStateChange(event: YT.OnStateChangeEvent) {
    if (event.data === YT.PlayerState.PLAYING) {
      console.log('playing');
      this.currentState = 'playing';
      this.room.playVideo(this.roomId);
      console.log(this.player.getCurrentTime());
      this.room.videoSync(this.roomId, Math.round(this.player.getCurrentTime()));

      this.syncInterval = setInterval(() => {
        console.log(this.player.getCurrentTime());
        this.room.videoSync(this.roomId, Math.round(this.player.getCurrentTime()));
      }, 1000);
    } else if (event.data === YT.PlayerState.PAUSED) {
      console.log('paused');
      this.currentState = 'paused';
      clearInterval(this.syncInterval);
      this.room.pauseVideo(this.roomId);
      this.room.videoSync(this.roomId, Math.round(this.player.getCurrentTime()));
    } else if ((event.data = YT.PlayerState.BUFFERING)) {
      console.log('buffering');
      this.currentState = 'buffering';
    }
    // console.log('state change', event, event.target.getCurrentTime());

    // event.target.seekTo(0);
  }
}
