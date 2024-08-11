import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  isLoading: boolean = false;
  apiError: string = '';
  apiSuccess: string = '';


  hide: boolean = true;
  isVerfiy: boolean = false;
  currentEmail: string = '';
  constructor(private toastr: ToastrService, private _AuthService: AuthService, private _Router: Router,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void { }


  changePassForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
    confirmNewPassword: new FormControl(null, [Validators.required]),
  })



  onChangePass(changePassForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.changePassword(changePassForm.value).subscribe({
      next: (response) => {
        this.apiSuccess = response.message;
        console.log(response);
        this.isLoading = false;
        //localStorage.setItem('userToken', response.token);
        //this._AuthService.getProfile();
      },
      error: (err:HttpErrorResponse) => {
        this.isLoading = false;
        this.toastr.error(err.error.message);
     
      }, complete: () => {
           this.onNoClick();
      }

    })

  }



  onNoClick(): void {
    this.dialogRef.close();
  }



}

