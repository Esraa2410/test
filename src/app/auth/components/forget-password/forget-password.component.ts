
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  isLoading: boolean = false;
  apiError: string = '';
  apiSuccess: string = '';
  hide: boolean = true;
  email: any;


 constructor(private toastr: ToastrService, private _AuthService: AuthService, private _Router: Router){ }
  ngOnInit(): void {

  }

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])

  })

  onForgetPassword(forgetForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.forgetPassword(forgetForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastr.success(res.message);
      },
      error: (err:HttpErrorResponse) => {
        this.isLoading = false;
        this.toastr.error(err.error.message);
      },
      complete: () => {
          this._Router.navigate(['/auth/verfiy']);
      }
    })
  }

  onNoClick(): void {
    this._Router.navigate(['/auth']);
  }
}
