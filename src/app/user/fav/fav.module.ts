import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavRoutingModule } from './fav-routing.module';
import { FavComponent } from './fav.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AddFavComponent } from './components/add-fav/add-fav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    FavComponent,
    AddFavComponent
  ],
  imports: [
    CommonModule,
    FavRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class FavModule { }
