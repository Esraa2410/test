import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName:string='';

  constructor(private _AuthService:AuthService) { }

  ngOnInit() {
    this.getUserName();
    //console.log(this.userName)
  }

  getUserName(){
    this.userName=this._AuthService.userName;
    //console.log(localStorage.getItem('userName'));

  }

}
