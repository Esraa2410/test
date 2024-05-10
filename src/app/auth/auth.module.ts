import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerfiyPasswordComponent } from './components/verfiy-password/verfiy-password.component';
import { HaveCodeComponent } from './components/have-code/have-code.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    VerfiyPasswordComponent,
    HaveCodeComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AuthModule { }
