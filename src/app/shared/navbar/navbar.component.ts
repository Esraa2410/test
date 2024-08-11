import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './../../auth/components/change-password/change-password.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LogOutComponent } from '../log-out/log-out.component';
import { UserDataComponent } from '../user-data/user-data.component';
import { UserDataService } from '../user-data/services/user-data.service';
interface User {
  id: number,
  userName: string,
  email: string,
  country: string,
  phoneNumber: string,
  imagePath?: string,
  group: {
    name: string
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  emptyImg: string = "../../../assets/images/Ellipse 234.svg";
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  userData: User = {
    id: 0,
    userName: '',
    email: '',
    country: '',
    phoneNumber: '',
    imagePath: '',
    group: {
      name: ''
    }
  };
  imgeProfile: string |any= '';

  constructor(private _AuthService: AuthService, public dialog: MatDialog, private _UserDataService: UserDataService) { 

  }

  ngOnInit() {
    // this.getUserName();
    this.currentUser()
  }





  openUserDataDailog() {
    const dialogRef = this.dialog.open(UserDataComponent, {
      width: '65%',
      height: '90%'
    });
  }

  openLogOutDailog() {
    const dialogRef = this.dialog.open(LogOutComponent, {
      width: '45%'
    });
  }



  openChangePassDailog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '45%'
    });
  }

  currentUser() {
    this._UserDataService.getCurrentUser().subscribe({
      next: (res) => {
        this.userData = res;
      }
    })

  }

}
