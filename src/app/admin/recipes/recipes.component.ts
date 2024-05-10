import { RecipeService } from './services/recipe.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { CategoryService } from '../categories/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  pageSize: number = 10;
  pageNumber: number = 1;
  listData: any;
  listTags: any[] = [];
  listCategories: any[] = [];
  categoryItem: string = '';
  editData: any;
  ifAdd: boolean = true;
  emptyImg: string = "../../../assets/images/Ellipse 234.svg";
  tagId: number = 0;
  categoryId: number = 0;
  searchValue: string = '';
  imgSrc: any;
  // imgUrl:string='files/users/images/852hq720.jpg';
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  apiSuccess: any;
  apiError: any;


  constructor(private _Router: Router, private _CategoryService: CategoryService,
    private _RecipeService: RecipeService, public dialog: MatDialog) {
    this.getRecipeDate();
    this.getTags();
    this.getAllCategory();
  }


  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getRecipeDate();
  }


  getRecipeDate() {
    let paramData = {
      name: this.searchValue,
      tagId: this.tagId,
      categoryId: this.categoryId,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    }
    return this._RecipeService.getAllRecipes(paramData).subscribe({
      next: (res) => {
        console.log(res);
        this.listData = res;
      }
    })
  }

  getTags() {
    return this._RecipeService.getAllTags().subscribe({
      next: (res) => {
        console.log(res);
        this.listTags = res;

      }
    })

  }


  getAllCategory() {
    return this._CategoryService.getAllCategories(10000, 1).subscribe({
      next: (res) => {
        console.log(res);
        this.listCategories = res.data;
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
      this.deleteRecipe(id);
      this.getRecipeDate();
    });
  }

  //delete category
  deleteRecipe(id: number) {
    this._RecipeService.onDeleteRecipe(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.apiSuccess = 'Deleted Successfuly';
        setTimeout(() => {
          if (this.apiSuccess) {
            this.apiSuccess = ''
          }
        }, 1000);
      },
      error: (err) => {
        // console.log(err)
        this.apiError = 'Can`t Delete';
        setTimeout(() => {
          if (this.apiError) {
            this.apiError = ''
          }
        }, 1000)
      }, complete: () => {
        this.getRecipeDate();
      }
    })
  }

}