import { Component, OnInit, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {
  apiSuccess: any;
  apiError: any;
  constructor(private _Router: Router,
    public dialogRef: MatDialogRef<LogOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  userData: any;
  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    this.apiSuccess="Logut Successfuly";
    setTimeout(() => {
      if (this.apiSuccess) {
        this.apiSuccess = ''
      }
    }, 1000);
    setTimeout(() => {
      this.onNoClick();
    }, 2000);
    setTimeout(() => {
      this._Router.navigate(['']);
    }, 3000);


  }

}
