import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading: boolean = false;
  apiSuccess:any;
  apiError:any;
  hide: boolean = true;
  email:string='';

  constructor(private _AuthService: AuthService, private _Router: Router,public dialog: MatDialog) { }
  ngOnInit(): void {

  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),

  })


  onLogin(loginForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.login(loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
       console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.getProfile();
        this.apiSuccess = 'Login Successfuly';
        setTimeout(() => {
          if(this.apiSuccess){
            this.apiSuccess=''
          }
        }, 1000);
      },
      error: (err) => {
        this.isLoading = false;
        this.apiError = err.error.message;
       // console.log(err.error.message);
        setTimeout(() => {
          if(this.apiError){
            this.apiError=''
          }
        }, 2000);
      },
      complete: () => {
        setTimeout(() => {
          this._Router.navigate(['dashboard']);
        }, 1000);
        
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