import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoading: boolean = false;
  apiSuccess: any;
  apiError: any;
  hide: boolean = true;
  email: string = '';

  constructor(private toastr: ToastrService, private _AuthService: AuthService, private _Router: Router, public dialog: MatDialog) { }


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),

  })


  onLogin(loginForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.login(loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem('userToken', res.token);
        this._AuthService.getProfile();
        this.toastr.success('Login Success');
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.toastr.error(err.error.message);

      },
      complete: () => {
        this._Router.navigate(['dashboard']);
      }

    })

  }

  redirectToRegister() {
    this._Router.navigate(['/auth/register']);
  }

  redirectToForgetPass() {
    this._Router.navigate(['/auth/forgetPass']);
  }


}