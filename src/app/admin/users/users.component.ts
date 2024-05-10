import { Component ,OnInit ,OnDestroy} from '@angular/core';
import { CategoryService } from '../categories/services/category.service';
import { RecipeService } from '../recipes/services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { UsersService } from './services/users.service';


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
  apiSuccess:any;
  apiError:any;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  roleIds: number[] = [];
  parameyarKey: number = 0;
  description: string = '';
  price: number = 0;

  constructor(private _UsersService: UsersService, private _CategoryService: CategoryService, private _RecipeService: RecipeService, public dialog: MatDialog) {
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
        console.log(res);
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
      console.log('The dialog was closed');
      //console.log(id);
      this.deleteUsers(id);
      this.getUsersDate();
    });
  }


  //delete users
  deleteUsers(id: number) {
    this._UsersService.onDeleteUsers(id).subscribe({
      next: (res) => {
        console.log(res);
        this.apiSuccess = res.message;
        setTimeout(() => {
          if(this.apiSuccess){
            this.apiSuccess=''
          }
        }, 3000);

      },
      error: (err) => {
        console.log(err);
        this.apiError = err.error.message;
       // console.log('apierr'+this.apiErro)
        setTimeout(() => {
          if(this.apiError){
            this.apiError=''
          }
        }, 3000);

      }
    })
  }

  



}