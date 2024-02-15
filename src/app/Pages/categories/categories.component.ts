import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from '../../Service/product.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CategoryDialogComponent } from '../../Dialogs/category-dialog/category-dialog.component';
import {MatAccordion, MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { ProductTablesComponent } from '../product-tables/product-tables.component';

// export interface CategoryData {
//   name: string;
// }

export interface CategoryData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatDividerModule,MatButtonModule,MatDialogModule,CategoryDialogComponent,MatButtonModule,MatExpansionModule,MatAccordion, CommonModule,ProductTablesComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  categoriesValue!: any[];
  categoryData !: any;
  isCategoryShow: boolean = false

  dataSource !: MatTableDataSource<CategoryData>;
  displayedColumns: string[] = ['title', 'description', 'price', 'discountPercentage', 'rating', 'stock','brand','category'];
  expandedCategory: any;
  expandedIndex: any;
  // displayedColumns: string[] = ['name','action'];

  constructor(
    private categoriesService: ProductService,
    public dialog: MatDialog,
    
  ){}
 
  ngOnInit(): void {
    this.categoriesService.getProductCategories().subscribe((res)=> {
      const formattedCategories = res.map((res: any) => ({ name: res }));
      this.categoriesValue = res;
    })
  }


  onEdit(data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        this.categoriesService.getProductCategoryName(data).subscribe((value) => {
            this.categoryData = value.products;
            this.isCategoryShow = true;
            resolve();
        }, (error) => {
            reject(error);
        });
    });
}

  openCategoryDialog(result:any){
    this.dialog.open(CategoryDialogComponent)
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: any, row: any) {
    
    event.stopPropagation();

    if(matExpansionPanel.expanded){
      
      this.onEdit(row).then(() => {
        // Set the expanded category index
        this.expandedIndex = this.categoriesValue.indexOf(row);
    });;
    }


    if (!this._isExpansionIndicator(event.target)) {
      this.isCategoryShow = false;
      matExpansionPanel.close();
    }
  }

  onPanelExpanded(expanded: any, row: any) {

    if (expanded) {
        this.expandedCategory = row;
    }
}

  private _isExpansionIndicator(target: EventTarget | any): boolean {
    const expansionIndicatorClass = "mat-expansion-indicator";
    return (
      target.classList && target.classList.contains(expansionIndicatorClass)
    );
  }
}
