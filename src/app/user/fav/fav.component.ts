import { Component } from '@angular/core';
import { FavService } from './services/fav.service';
import { PageEvent} from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss'],
})
export class FavComponent {
  listFav:any;
  emptyImg: string = "../../../assets/images/Ellipse 234.svg";
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  pageSize: number = 10;
  pageNumber: number = 1;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;



  constructor(private _ToastrService:ToastrService, private _FavService:FavService,public dialog: MatDialog){
    this.getAllFav();
  }

  getAllFav(){
    this._FavService.getAllFavRecipes().subscribe({
      next:(res)=>{
        this.listFav=res; 
      }
    })
  }


  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllFav();
  }

   //openDialogDelete
   openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        id: id
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.deleteFavRecipe(id);
      this.getAllFav();
    });
  }

  //delete category
  deleteFavRecipe(id: number) {
    this._FavService.getDeleteFavRecipes(id).subscribe({
      next: (res) => {
        this._ToastrService.success('This Recipe Deleted Successfuly');
      },
      error: (err) => {
        this._ToastrService.error('This Recipe Can`t Delet , Try Again ');
      },complete:()=>{
        this.getAllFav();
      }
    })
  }
}
