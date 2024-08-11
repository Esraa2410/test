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
  }


  openUserDataDailog(){
    const dialogRef = this.dialog.open(UserDataComponent, {
      width:'65%',
      height:'90%'
    });
  }

  openLogOutDailog(){
    const dialogRef = this.dialog.open(LogOutComponent, {
      width:'45%'
    });
  }



  openChangePassDailog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width:'45%'
    });
  }

  currentUser(){
    this._UserDataService.getCurrentUser().subscribe({
      next:(res)=>{
        this.userData=res;
      }
    })

  }

}
