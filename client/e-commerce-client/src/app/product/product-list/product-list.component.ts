import { ProductService } from "./../../services/product.service";
import { Product } from "./../../ecommerce/models/product";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
// import { Store, select } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import * as ProductActions from "../store/product.action";
import { productSelector } from "../store/product.reducer";
import ProductState from '../store/product.state';
import { Select,Selector,Store } from '@ngxs/store';
import { GetProducts, DeleteProduct } from '../store-ngxs/product-action-ngxs';
import { ProductStateNgxs } from '../store-ngxs/product-state-ngxs';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  // products: Product[];
  @Select(ProductStateNgxs.getPrductList) productsNgxs : Observable<Product[]>;
  ProductList: Product[];
  productError: Error;

  constructor(
    private router: Router,
    private storengxs : Store
  ) {}

  ngOnInit() {
    this.reloadData();
    this.storengxs.dispatch(new GetProducts())
  }

  reloadData() {
    this.productsNgxs.subscribe(prductList => this.ProductList = prductList)
  }

  deleteProduct(id: number) {
    this.storengxs.dispatch(new DeleteProduct(id))
  }

  updateProduct(id: number) {
    this.router.navigate(["update", id]);
  }

  ngOnDestroy() {
  }
}
