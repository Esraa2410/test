import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HaveCodeComponent } from '../have-code/have-code.component';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  apiError: string = '';
  apiSuccess:string='';
  files: File[] = [];
  imgSrc: any;
  hide: boolean = true;
  isVerfiy: boolean = false;
  currentEmail: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router,public dialog: MatDialog) { }
  ngOnInit(): void {

  }

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
        this.apiError = '';
        this.apiSuccess=response.message;
        console.log(response);
        this.isLoading = false;     
        setTimeout(() => {
          if(this.apiSuccess){
            this.apiSuccess=''
          }
        }, 2000);  
      },
      error: (err) => {
        this.isLoading = false;
        this.apiError = err.error.message;
        this.apiError = err.error.message;
        setTimeout(() => {
          if(this.apiError){
            this.apiError=''
          }
        }, 2000);
      },complete:()=>{
        setTimeout(() => {
          this.openHaveCodeDialog();
        }, 2000);

      }

    })

  }

  onSelect(event: any) {
    console.log(event);
    //spread operator
    this.files.push(...event.addedFiles);
    console.log(this.files);

    //console.log(this.files[0].name);
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

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    
  }


}
