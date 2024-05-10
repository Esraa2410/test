
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


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


 constructor(private _AuthService: AuthService, private _Router: Router){ }
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
        this.apiError = '';
        this.apiSuccess = res.message;
        console.log(res);
        this.apiSuccess=res.message;
        setTimeout(() => {
          if(this.apiSuccess){
            this.apiSuccess=''
          }
        }, 3000); 
      },
      error: (err) => {
        this.isLoading = false;
        this.apiError = err.error.message;
        this.apiSuccess = '';
        console.log(err.error.message);
        setTimeout(() => {
          if(this.apiError){
            this.apiError=''
          }
        }, 3000);
      },
      complete: () => {
        setTimeout(() => {
          this._Router.navigate(['/auth/verfiy']);
        }, 1000);
      }

    })

  }


}
