import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';


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
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(private _ToastrService: ToastrService, private _CategoryService: CategoryService, public dialog: MatDialog) {
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
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.deleteCategory(id);
      this.getCategoriesDate();
    });
  }

  //add category
  addCategory(categoryName: string) {
    this._CategoryService.onAddCategory(categoryName).subscribe({
      next: (res) => {
        this._ToastrService.success('Adding Successfuly');
      },
      error: (err) => {
        this._ToastrService.error('Error in Adding ');
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
        this._ToastrService.success('Editing Successfuly');
      },
      error: () => {
        this._ToastrService.error('Error in Editing');
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
        this._ToastrService.success('Deleted Successfuly');
      },
      error: (err) => {
        this._ToastrService.error('Can`t Delete');
      }
    })
  }
}
