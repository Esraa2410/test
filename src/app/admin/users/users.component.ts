import { Component } from '@angular/core';
import { CategoryService } from '../categories/services/category.service';
import { RecipeService } from '../recipes/services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from './services/users.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  pageSize: number = 10;
  pageNumber: number = 1;
  listData: any;
  listTags: any[] = [];
  listCategories: any[] = [];
  categoryItem: string = '';
  editData: any;
  ifAdd: boolean = true;
  searchValue: string = '';
  imgSrc: any;
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  emptyImg: string = "../../../assets/images/Ellipse 234.svg";
  showAlert: boolean = false;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  roleIds: number[] = [];
  parameyarKey: number = 0;
  description: string = '';
  price: number = 0;

  constructor(private _ToastrService:ToastrService,  private _UsersService: UsersService, private _CategoryService: CategoryService, private _RecipeService: RecipeService, public dialog: MatDialog) {
    this.getUsersDate();
  
  }

 
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getUsersDate();
  }

  getUsersDate() {
    let paramData = {
      [this.parameyarKey]: this.searchValue,
      groups: this.roleIds,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    }
    return this._UsersService.getAllUsers(paramData).subscribe({
      next: (res) => {
        this.listData = res;
      }
    })
  }

  

  //openDialogDelete
  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      // width: '50%'
      data: {
        id: id
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.deleteUsers(id);
      this.getUsersDate();
    });
  }


  //delete users
  deleteUsers(id: number) {
    this._UsersService.onDeleteUsers(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        this._ToastrService.error(err.error.message);
      }
    })
  }

  



}