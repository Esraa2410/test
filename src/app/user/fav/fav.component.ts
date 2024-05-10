import { Component } from '@angular/core';
import { FavService } from './services/fav.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

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
  apiSuccess:any;
  apiError:any;


  constructor(private _FavService:FavService,public dialog: MatDialog){
    this.getAllFav();
  }

  getAllFav(){
    this._FavService.getAllFavRecipes().subscribe({
      next:(res)=>{
        this.listFav=res;
        console.log('res'+res)
        
      },error:(err)=>{
        console.log(err);
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
      // width: '50%'
      data: {
        id: id
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //console.log(id);
      this.deleteFavRecipe(id);
      this.getAllFav();
    });
  }

  //delete category
  deleteFavRecipe(id: number) {
    this._FavService.getDeleteFavRecipes(id).subscribe({
      next: (res) => {
        console.log(res);
        this.apiSuccess='This Recipe Deleted Successfuly';
        setTimeout(() => {
          if(this.apiSuccess){
            this.apiSuccess=''
          }
        }, 3000); 
      },
      error: (err) => {
        console.log(err)
        this.apiError = 'This Recipe Can`t Delet , Try Again ';
        setTimeout(() => {
          if(this.apiError){
            this.apiError=''
          }
        }, 3000);

      },complete:()=>{
        this.getAllFav();
      }
    })
  }
}
