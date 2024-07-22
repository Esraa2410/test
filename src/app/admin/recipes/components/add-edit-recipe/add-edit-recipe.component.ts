import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { CategoryService } from 'src/app/admin/categories/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {
  isLoading: boolean = false;
  apiError: string = '';
  apiSuccess: string = '';
  files: File[] = [];
  listTags: any[] = [];
  imgSrc: any;
  hide: boolean = true;
  listCategories: any;
  tagId: number = 0;
  categoryId: number = 0;
  listData: any;
  activateId: number = 0
  recipeDataId: any;
  selectedCateIds: any[] = [];

  constructor(
    private _Router: Router,
    private _RecipeService: RecipeService,
    private _CategoryService: CategoryService,
    private _ActivatedRoute: ActivatedRoute) {
    this.activateId = _ActivatedRoute.snapshot.params['id'];
    this.getCategoriesDate()
    this.getTags();
    if (this.activateId) {
      //edit
      this.getRecipeById(this.activateId);
    } else {
      //add

    }

  }
  ngOnInit(): void { }




  //addRecipeForm
  addRecipeForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    tagId: new FormControl(null, [Validators.required]),
    recipeImage: new FormControl(null),
    categoriesIds: new FormControl(null)
  })

  //add-edit function
  onAddEditRecipe(addRecipeForm: FormGroup) {
    let myData = new FormData();
    myData.append('name', addRecipeForm.value.name);
    myData.append('description', addRecipeForm.value.description);
    myData.append('price', addRecipeForm.value.price);
    myData.append('tagId', addRecipeForm.value.tagId);
    myData.append('recipeImage', this.imgSrc);
    myData.append('categoriesIds', addRecipeForm.value.categoriesIds);
    this.isLoading = true;
    if (this.activateId) {
      //edit
      this._RecipeService.getEditRecipe(myData, this.activateId).subscribe({
        next: (re) => {
          console.log(re);
          this.isLoading = false;
          this.apiError = '';
          this.apiSuccess = 'Editing Successfuly ';
          setTimeout(() => {
            if (this.apiSuccess) {
              this.apiSuccess = ''
            }
          }, 1000);
        }, error: (er) => {
          console.log(er);
          this.isLoading = false;
          this.apiError = 'Error in Editing';
          setTimeout(() => {
            if (this.apiError) {
              this.apiError = ''
            }
          }, 2000);
        }, complete: () => {
          this.getRecipeDate();

        }
      })
    } else {
      //add
      this._RecipeService.onAddRecipe(myData).subscribe({
        next: (response) => {
          this.apiError = '';
          this.apiSuccess = response.message
          this.isLoading = false;
          setTimeout(() => {
            if (this.apiSuccess) {
              this.apiSuccess = ''
            }
          }, 1000);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.apiError = err.error.message;
          setTimeout(() => {
            if (this.apiError) {
              this.apiError = ''
            }
          }, 2000);
        }, complete: () => {
          this.getRecipeDate();
        }
      })
    }
  }

  getRecipeDate() {
    let paramData = {
      name: this.addRecipeForm.value['name'],
      tagId: this.tagId,
      categoryId: this.categoryId,
    }
    return this._RecipeService.getAllRecipes(paramData).subscribe({
      next: (res) => {
        this.listData = res.data;

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


  getCategoriesDate() {
    return this._CategoryService.getAllCategories(1000, 1).subscribe({
      next: (res) => {
        this.listCategories = res.data;
      }
    })

  }

  //edit
  getRecipeById(id: number) {
    this._RecipeService.getRecipeById(id).subscribe({
      next: (res) => {
        console.log(res)
        this.recipeDataId = res;
        setTimeout(() => {
          if (this.apiSuccess) { this.apiSuccess = ''}}, 1000);
      },
      error: (err) => {
        console.log(err);
        this.apiError = err.error.message;
        setTimeout(() => {
          if (this.apiError) {this.apiError = '' }}, 2000);
      }, complete: () => {
        for (let i = 0; i < this.recipeDataId.category.length; i++) {
          this.selectedCateIds.push(this.recipeDataId.category[i].id)}
        this.addRecipeForm.patchValue({
          name: this.recipeDataId.name,
          description: this.recipeDataId.description,
          price: this.recipeDataId.price,
          tagId: this.recipeDataId.tag.id,
          recipeImage: this.recipeDataId.imagePath,
          categoriesIds: this.selectedCateIds
        })
        console.log('this.recipeDataId.imagePath,' + this.recipeDataId.imagePath)
      }
    })
  }

  onSelect(event: any) {
    console.log(event);
    //spread operator
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
