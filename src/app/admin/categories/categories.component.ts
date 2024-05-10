import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  pageSize: number = 10;
  pageNumber: number = 1;
  listData: any;
  categoryItem: string = '';
  editData: any;
  ifAdd: boolean = true;
  apiSuccess:any;
  apiError:any;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(private _CategoryService: CategoryService, public dialog: MatDialog) {
    this.getCategoriesDate();
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getCategoriesDate();
  }

  getCategoriesDate() {
    return this._CategoryService.getAllCategories(this.pageSize, this.pageNumber).subscribe({
      next: (res) => {
        console.log(res);
        this.listData = res;
      }
    })

  }

  //openDialog Add
  openDialog(): void {
    this.ifAdd = true;
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '35%',
      data: {
        name: this.categoryItem,
        ifAdd: this.ifAdd
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (result) {
        this.addCategory(result);
      }
    });
  }

  //openDialogEdit
  openDialogEdit(id: number, name: string): void {
    this.ifAdd = false;
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '35%',
      data: {
        id: id,
        name: name,
        ifAdd: this.ifAdd

      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.ifAdd = false;
      if (result) {
        this.editCategory(id, result);
        this.getCategoriesDate();
      }
    });
  }

  //openDialogDelete
  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id: id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.deleteCategory(id);
      this.getCategoriesDate();
    });
  }

  //add category
  addCategory(categoryName: string) {
    this._CategoryService.onAddCategory(categoryName).subscribe({
      next: (res) => {
        this.apiSuccess = 'Adding Successfuly';
        setTimeout(() => {
          if(this.apiSuccess){
            this.apiSuccess=''
          }
        }, 3000);
      },
      error: (err) => {
        this.apiError = 'Error in Adding ';
        setTimeout(() => {
          if(this.apiError){
            this.apiError=''
          }
        }, 3000);
      },
      complete: () => {
        this.getCategoriesDate();
      }
    })

  }

  //edit category
  editCategory(id: number, categoryName: string) {
    this._CategoryService.onEditCategory(id, categoryName).subscribe({
      next: (res) => {
        this.editData = res;
        this.apiSuccess = 'Editing Successfuly';
        setTimeout(() => {
          if(this.apiSuccess){
            this.apiSuccess=''
          }
        }, 3000);
      },
      error: () => {
        this.apiError = 'Error in Editing';
         setTimeout(() => {
           if(this.apiError){
             this.apiError=''
           }
         }, 3000);
      },
      complete: () => {
        this.getCategoriesDate();
      }
    })

  }

  //delete category
  deleteCategory(id: number) {
    this._CategoryService.onDeleteCategory(id).subscribe({
      next: (res) => {
       // console.log(res);
        this.apiSuccess = 'Deleted Successfuly';
        setTimeout(() => {
          if(this.apiSuccess){
            this.apiSuccess=''
          }
        }, 3000);
      },
      error: (err) => {
       // console.log(err);
        this.apiError = 'Can`t Delete';
        setTimeout(() => {
          if(this.apiError){
            this.apiError=''
          }
        }, 3000);
      }
    })
  }
}
