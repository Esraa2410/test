import { CategoryService } from './../../admin/categories/services/category.service';
import { RecipeService } from './../../admin/recipes/services/recipe.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { FavService } from '../fav/services/fav.service';
import { AddFavComponent } from '../fav/components/add-fav/add-fav.component';



@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrls: ['./user-recipe.component.scss']
})
export class UserRecipeComponent {

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
  // imgUrl:string='files/users/images/852hq720.jpg';
  emptyImg: string = "../../../assets/images/Ellipse 234.svg";
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  apiFavSuccess: string = '';
  apiFavError: string = '';

  constructor(private _ToastrService: ToastrService, private _FavService: FavService, private _CategoryService: CategoryService, private _RecipeService: RecipeService, public dialog: MatDialog) {
    this.getRecipeDate();
    this.getTags();
    this.getAllCategory();
  }
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getRecipeDate();
  }

  tagId: number = 0;
  categoryId: number = 0;
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
        this.listData = res;
      }
    })
  }

  getTags() {
    return this._RecipeService.getAllTags().subscribe({
      next: (res) => {
        this.listTags = res;

      }
    })

  }


  getAllCategory() {
    return this._CategoryService.getAllCategories(10000, 1).subscribe({
      next: (res) => {
        this.listCategories = res.data;

      }
    })

  }


  //openDialogFav
  openDialogFav(id: number): void {
    const dialogRef = this.dialog.open(AddFavComponent, {
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.favRecipe(id);
        this.getRecipeDate();
      }
    });
  }

  addRecipeDetails: any;
  //add recipe to fav 
  favRecipe(id: number) {
    this._FavService.onAddFavRecipes(id).subscribe({
      next: (res) => {
        this.addRecipeDetails = res;
        this._ToastrService.success('This Recipe Added to Fav Successfuly');
      },
      error: (err) => {
        this._ToastrService.error('This Recipe Can`t Added To Fav, Try Again');
      }
    })
  }



  //openDialogDelete
  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecipe(id);
        this.getRecipeDate();
      }
    });
  }
  //delete recipe
  deleteRecipe(id: number) {
    this._RecipeService.onDeleteRecipe(id).subscribe({
      next: (response) => {
        this._ToastrService.success('This Recipe Deleted Successfuly');
      },
      error: (err) => {
        this._ToastrService.error('This Recipe Can`t Delet , Try Again');
      }
    })
  }

}