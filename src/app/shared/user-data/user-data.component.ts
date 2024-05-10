import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from './services/user-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';


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
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit{
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
  emptyImg: any = "../../../assets/images/Ellipse 234.svg";
  imgUrl: any = 'https://upskilling-egypt.com:3006/';
  imgSrc: any;
  files: File[] = [];
  apiSuccess: string = '';
  apiError: string = '';
  isLoading: boolean = false;
  hide: boolean = true;

  constructor(private _AuthService:AuthService, private _Router: Router, private _UserDataService: UserDataService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (localStorage.getItem('userToken')) {
      this.currentUser();
    }
  }
 
  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  currentUser() {
    this._UserDataService.getCurrentUser().subscribe({
      next: (res) => {
        //console.log(res);
        this.userData = res;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }


  //updateForm
  updateForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null),
    country: new FormControl(null),
    phoneNumber: new FormControl(null),
    profileImage: new FormControl(null),
    confirmPassword: new FormControl(null, [Validators.required])
  })

  //updateForm function
  onUpdate(updateForm: FormGroup) {
    let myData = new FormData();
    myData.append('userName', updateForm.value.userName);
    myData.append('email', updateForm.value.email);
    myData.append('country', updateForm.value.country);
    myData.append('phoneNumber', updateForm.value.phoneNumber);
    myData.append('profileImage', this.imgSrc);
    myData.append('confirmPassword', updateForm.value.confirmPassword)
    this.isLoading = true;

    this._UserDataService.updateCurrentUser(myData).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('userName', response.userName);

        this.apiSuccess = 'Profile Data Updated Successfuly';
        this.isLoading = false;
        setTimeout(() => {
          if (this.apiSuccess) {
            this.apiSuccess = ''
          }
        }, 3000);
      },
      error: (err) => {
        console.log(err);
        this.apiError = err.error.message;
        this.isLoading = false;
        setTimeout(() => {
          if (this.apiError) {
            this.apiError = ''
          }
        }, 3000);
      },complete:()=>{
        // this.onNoClick();
        // this._Router.navigate(['../../auth']);
        
        
      }
    })

  }

  onSelect(event: any) {
    console.log(event);
    //spread operator
    this.files.push(...event.addedFiles);
    console.log(this.files);
    //console.log(this.files[0].name);
    // userData.imagePath?imgUrl+userData.imagePath:emptyImg"
      this.imgSrc = this.files[0];
    

    
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }



















}
