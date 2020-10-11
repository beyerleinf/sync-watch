import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services';

@Component({
  selector: 'syncw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private room: RoomService) {}

  ngOnInit(): void {}
}
