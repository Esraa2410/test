interface IMenue {
  text: string;
  icon: string;
  link?: string;
  isActive: boolean;
}

import { Component } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private _AuthService: AuthService ,public dialog: MatDialog) { }
  isAdmin(): boolean {
    return this._AuthService.role == 'SuperAdmin' ? true : false;
  }
  isUser(): boolean {
    return this._AuthService.role == 'SystemUser' ? true : false;
  }
  menue: IMenue[] = [
    {
      text: 'Home',
      icon: 'fa-solid fa-home',
      link: 'home',
      isActive: this.isAdmin() || this.isUser()
    },
    {
      text: 'Users',
      icon: 'fa-solid fa-users',
      link: 'admin/users',
      isActive: this.isAdmin()
    },
    {
      text: 'Recipes',
      icon: 'fa-regular fa-rectangle-list',
      link: 'user/user-recipe',
      isActive: this.isUser()
    },
    {
      text: 'Categories',
      icon: 'fa-solid fa-receipt',
      link: 'admin/categories',
      isActive: this.isAdmin()
    },
    {
      //Admin Recipes
      text: 'Recipes',
      icon: 'fa-regular fa-rectangle-list',
      link: 'admin/recipes',
      isActive: this.isAdmin()
    },

    {
      text: 'Fav',
      icon: 'fa-solid fa-heart',
      link: 'user/fav',
      isActive: this.isUser()
    },

  ]






}
