import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { LogOutComponent } from './log-out/log-out.component';
import { UserDataComponent } from './user-data/user-data.component';




@NgModule({
  imports: [
    CommonModule,
    NgxDropzoneModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,

  ],
  exports: [
    NgxDropzoneModule,
    SidebarComponent,
    NavbarComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,

  ],
  declarations: [
    SharedComponent,
    SidebarComponent,
    NavbarComponent,
    DeleteComponent,
    HomeComponent,
    LogOutComponent,
    UserDataComponent
  ]
})
export class SharedModule { }
