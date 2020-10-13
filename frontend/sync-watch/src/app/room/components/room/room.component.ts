import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'sync-watch/src/app/shared/services';

@Component({
  selector: 'syncw-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  roomId: string;

  constructor(private room: RoomService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params.id;

    this.room.getRoom(this.roomId).subscribe(
      room => {
        console.log('room exists', room);
      },
      error => {
        if (!error.exists) {
          this.router.navigate(['/'], { queryParams: { e: 'notfound' } });
        }
      }
    );
  }
}
