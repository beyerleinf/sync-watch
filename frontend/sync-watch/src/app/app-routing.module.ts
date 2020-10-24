import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'room',
    loadChildren: () => import(/* webpackChunkName: 'room' */ './room/room.module').then(m => m.RoomModule),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
