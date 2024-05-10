import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verfiy-password',
  templateUrl: './verfiy-password.component.html',
  styleUrls: ['./verfiy-password.component.scss']
})
export class VerfiyPasswordComponent implements OnInit {
  isLoading: boolean = false;
  apiError: string = '';
  apiSuccess:string='';
  hide: boolean = true;
  isVerfiy: boolean = false;
  currentEmail: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  ngOnInit(): void {  }

  //resetPassForm
  resetPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    seed: new FormControl(null, [Validators.required]),
  })

  //onResetPass
  onResetPass(resetPassForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.resetPassword(resetPassForm.value).subscribe({
      next: (response) => {
        this.apiError = '';
        this.apiSuccess=response.message;
        this.isLoading = false;
        setTimeout(() => {
          if(this.apiSuccess){
            this.apiSuccess=''
          }
        }, 1000); 
      },
      error: (err) => {
        this.isLoading = false;
        this.apiError = err.error.message;
        setTimeout(() => {
          if(this.apiError){
            this.apiError=''
          }
        }, 2000);
      },complete:()=>{
        setTimeout(() => {
          this._Router.navigate(['auth']);
        }, 1000);

      }

    })

  }


}
