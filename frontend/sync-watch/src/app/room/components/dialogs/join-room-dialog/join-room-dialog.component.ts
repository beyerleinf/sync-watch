import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'syncw-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.scss'],
})
export class JoinRoomDialogComponent implements OnInit {
  name: string;

  constructor() {}

  ngOnInit(): void {}

  submit() {
    return { name: this.name };
  }
}
