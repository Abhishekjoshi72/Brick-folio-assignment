import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductDialogComponent } from '../../Dialogs/product-dialog/product-dialog.component';
import { ProductService } from '../../Service/product.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface ProductData {
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
  selector: 'app-product-tables',
  standalone: true,
  imports: [MatTableModule,CommonModule,MatIconModule,MatDividerModule,MatButtonModule,MatDialogModule,ProductDialogComponent,MatProgressSpinnerModule],
  templateUrl: './product-tables.component.html',
  styleUrl: './product-tables.component.css'
})
export class ProductTablesComponent implements OnInit,OnChanges {
 
  constructor(
    private categoriesService: ProductService,
    public dialog: MatDialog
  ){ }

  @Input() data !: any;
  dataSource !: MatTableDataSource<ProductData>;
  isproductData: boolean = false;

  displayedColumns: string[] = ['title', 'description', 'price', 'discountPercentage', 'rating', 'stock','brand','category','action'];

  ngOnInit(): void {
   this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      // Update dataSource or perform any other actions
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  viewProduct(data:any){
    this.isproductData = true;
    this.categoriesService.getProductId(data.id).subscribe((value)=>{
      this.openProductDialog(value);
      this.isproductData = false;
    })
  }

  openProductDialog(productValue:any){
    this.dialog.open(ProductDialogComponent,{
      width: '500px',
      data: productValue
    });
  }
}
