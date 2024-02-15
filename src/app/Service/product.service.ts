import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:any = "https://dummyjson.com";

  constructor(
    public http: HttpClient,
  ) { }

 
  getProduct():Observable<any>{
    return this.http.get<any>(this.url+'/products').pipe(map((value:any)=>{
      return value;
    }))
  }

  getProductCategories(){
    return this.http.get<any>(this.url+'/products/categories').pipe(map((value:any)=>{
      return value;
    }))
  }

  getProductCategoryName(name:any){
    return this.http.get<any>(this.url+'/products/category/'+name).pipe(map((value:any)=>{
      return value;
    }))
  }

  getProductId(id:any){
    return this.http.get<any>(this.url+'/products/'+id).pipe(map((value:any)=>{
      return value;
    }))
  }
}
