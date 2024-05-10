import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRecipeComponent } from './user-recipe.component';

const routes: Routes = [{ path: '', component: UserRecipeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRecipeRoutingModule { }
