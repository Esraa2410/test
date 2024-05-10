import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './../../auth/components/change-password/change-password.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LogOutComponent } from '../log-out/log-out.component';
import { UserDataComponent } from '../user-data/user-data.component';
import { UserDataService } from '../user-data/services/user-data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName:string='';
  emptyImg: string = "../../../assets/images/Ellipse 234.svg";
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  userData:any;

  constructor(private _AuthService:AuthService,public dialog: MatDialog ,private _UserDataService:UserDataService) { }

  ngOnInit() {
    this.getUserName();
  }

  getUserName(){
    this.userName=this._AuthService.userName;
    //console.log(localStorage.getItem('userName'));
  }


  openUserDataDailog(){
    const dialogRef = this.dialog.open(UserDataComponent, {
      width:'45%',
      height:'70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      console.log(result);
    });

  }

  openLogOutDailog(){
    const dialogRef = this.dialog.open(LogOutComponent, {
      width:'45%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      console.log(result);
    });

  }



  openChangePassDailog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width:'45%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      console.log(result);
    });

  }

  currentUser(){
    this._UserDataService.getCurrentUser().subscribe({
      next:(res)=>{
        console.log(res);
        this.userData=res;
      },
      error:(err)=>{
        console.log(err);
      },
    })

  }

}
