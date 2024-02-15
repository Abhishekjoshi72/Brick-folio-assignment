import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProductService } from '../../Service/product.service';
import { ProductTablesComponent } from '../product-tables/product-tables.component';

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
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule,CommonModule,ProductTablesComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements  OnInit {

  productData !: any;
 
  constructor(
    private productserice: ProductService,
  ){ }

  ngOnInit(){
    this.productserice.getProduct().subscribe((res)=>{
      this.productData = res.products;
      console.log('PRODUCTS COMPONENT:',this.productData);
      // this.dataSource = new MatTableDataSource(res.products);
    })
  }
}
