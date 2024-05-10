import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-have-code',
  templateUrl: './have-code.component.html',
  styleUrls: ['./have-code.component.scss']
})
export class HaveCodeComponent {
  isLoading: boolean = false;
  apiError: string = '';
  files: File[] = [];
  imgSrc: any;
  hide: boolean = true;
  isVerfiy: boolean = false;
  currentEmail: string = '';
  apiSuccess:any;
  constructor(private _AuthService: AuthService, private _Router: Router,
    public dialogRef: MatDialogRef<HaveCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void { }

  verfiyForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required]),
  })

  onVerfiy(verfiyForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.verfiy(verfiyForm.value).subscribe({
      next: (response) => {
        this.apiSuccess=response.message;
        console.log(response);
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
      }, complete: () => {
        setTimeout(() => {
          this.onNoClick();
          this._Router.navigate(['../']);
        }, 1000);
        
      }

    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
