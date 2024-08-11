import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HaveCodeComponent } from '../have-code/have-code.component';
import { MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  isLoading: boolean = false;
  apiError: string = '';
  apiSuccess:string='';
  files: File[] = [];
  imgSrc: any;
  hide: boolean = true;
  isVerfiy: boolean = false;
  currentEmail: string = '';

  constructor(private toastr: ToastrService, private _AuthService: AuthService, private _Router: Router,public dialog: MatDialog) { }


  //registerForm
  registerForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    profileImage: new FormControl(null),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required])
  })

  //registerForm function
  onRegister(registerForm: FormGroup) {
    let myData = new FormData();
    this.currentEmail=registerForm.value.email;
    myData.append('userName', registerForm.value.userName);
    myData.append('email', registerForm.value.email);
    myData.append('country', registerForm.value.country);
    myData.append('phoneNumber', registerForm.value.phoneNumber);
    myData.append('profileImage', this.imgSrc);
    myData.append('password', registerForm.value.password);
    myData.append('confirmPassword', registerForm.value.confirmPassword);
    this.isLoading = true;
    this._AuthService.register(myData).subscribe({
      next: (response) => {
        this.toastr.success(response.message)
        this.isLoading = false;      
      },
      error: (err:HttpErrorResponse) => {
        this.isLoading = false;
       this.toastr.error(err.error.message)
      },complete:()=>{
        this. openHaveCodeDialog(); 

      }
    })
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  //redirectToLogin
  redirectToLogin() {
    this._Router.navigate(['/auth']);
  }

//open have code dailog
  openHaveCodeDialog():void{
      const dialogRef = this.dialog.open(HaveCodeComponent, {
        data:{email:this.currentEmail}
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
    
  }


}
