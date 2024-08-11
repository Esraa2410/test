import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

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
  apiSuccess: any;
  constructor(private toastr: ToastrService, private _AuthService: AuthService, private _Router: Router,
    public dialogRef: MatDialogRef<HaveCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  verfiyForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required]),
  })

  onVerfiy(verfiyForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.verfiy(verfiyForm.value).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.toastr.error(err.error.message);
      }, complete: () => {
        this.onNoClick();
        this._Router.navigate(['../']);
      }

    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
