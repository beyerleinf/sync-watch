import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services';

@Component({
  selector: 'syncw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private room: RoomService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      if (query.e) {
        console.warn(query.e);
      }
    });
  }

  createRoom() {
    this.room.createRoom().subscribe(room => {
      console.log('created room', room);
      this.router.navigate(['room', room.id]);
    });
  }
}
