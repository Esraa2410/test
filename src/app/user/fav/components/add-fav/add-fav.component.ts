import { Component ,Inject} from '@angular/core';
import{MatDialogRef ,MAT_DIALOG_DATA}from '@angular/material/dialog';


@Component({
  selector: 'app-add-fav',
  templateUrl: './add-fav.component.html',
  styleUrls: ['./add-fav.component.scss']
})
export class AddFavComponent {
  emptyImg: string = "../../../../../assets/images/Ellipse 234.svg" 
  imgUrl: string = 'https://upskilling-egypt.com:3006/';

  constructor(
    public dialogRef: MatDialogRef<AddFavComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  ) {
      

    }
    onNoClick(): void {
      this.dialogRef.close();
    }
   
   
}
