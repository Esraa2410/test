import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from './services/user-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';


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
export class UserDataComponent {
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
  isLoading: boolean = false;
  hide: boolean = true;

  constructor(private _ToastrService: ToastrService, private _AuthService: AuthService, private _Router: Router, private _UserDataService: UserDataService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (localStorage.getItem('userToken')) {
      this.currentUser();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  currentUser() {
    this._UserDataService.getCurrentUser().subscribe({
      next: (res) => {
        this.userData = res;
      }
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
        localStorage.setItem('userName', response.userName);
        this._ToastrService.success('Profile Data Updated Successfuly');
        this.isLoading = false;
      },
      error: (err) => {
        this._ToastrService.error(err.error.message);
      }, complete: () => {
        this.onNoClick();
      }
    })

  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }



















}
