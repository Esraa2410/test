import { ILogin, IForgetPassword, IVerfiy, IResetPassword, IChangePassword } from './../models/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string | any = '';
  userName: string | any = '';

  constructor(private _HttpClient: HttpClient) {
    //reload
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
    }

  }

  getProfile() {
    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    localStorage.setItem('role', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);
    //////////////////
    this.userName = localStorage.getItem('userName');
    this.getRole();
  }

  getRole() {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') !== null) {
      this.role = localStorage.getItem('role');

    }
  }

  login(data: ILogin): Observable<any> {
    return this._HttpClient.post('Users/Login', data);
  }

  //forget in login
  forgetPassword(data: string): Observable<any> {
    return this._HttpClient.post('Users/Reset/Request', data)
  }
  //login->forget->verify(resetPassword)
  resetPassword(data: IResetPassword): Observable<any> {
    return this._HttpClient.post('Users/Reset', data)
  }

  //register->havecode
  verfiy(data: IVerfiy): Observable<any> {
    return this._HttpClient.put('Users/verify', data)
  }

  //register
  register(data: FormData): Observable<any> {
    return this._HttpClient.post('Users/Register', data);
  }

  //change pass
  changePassword(data: IChangePassword): Observable<any> {
    return this._HttpClient.put('Users/ChangePassword', data)
  }

}
