import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomComponent } from './components';
import { RoomRoutingModule } from './room-routing.module';

@NgModule({
  declarations: [RoomComponent],
  imports: [CommonModule, RoomRoutingModule],
})
export class RoomModule {}
