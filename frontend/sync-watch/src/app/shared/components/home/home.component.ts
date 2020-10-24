import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services';

@Component({
  selector: 'syncw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private matSnackbarRef: MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    private room: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      if (query.e) {
        this.matSnackbarRef = this.snackbar.open('The room could not be found.', 'Dismiss', {
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
          duration: 10000,
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.matSnackbarRef) {
      this.matSnackbarRef.dismiss();
    }
  }

  createRoom() {
    this.room.createRoom();
    const subscription = this.room.onRoomCreated().subscribe(id => {
      subscription.unsubscribe();
      this.router.navigate(['room', id]);
    });
    // .subscribe(room => {
    //   this.router.navigate(['room', room.id]);
    // });
  }
}
