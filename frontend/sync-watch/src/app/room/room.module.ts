import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material.module';
import { RoomComponent } from './components';
import { JoinRoomDialogComponent } from './components/dialogs/join-room-dialog/join-room-dialog.component';
import { RoomRoutingModule } from './room-routing.module';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [RoomComponent, JoinRoomDialogComponent],
  imports: [CommonModule, RoomRoutingModule, SharedMaterialModule, FormsModule, YouTubePlayerModule],
})
export class RoomModule {}
