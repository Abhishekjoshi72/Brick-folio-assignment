import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.css'
})
export class CategoryDialogComponent {

}
