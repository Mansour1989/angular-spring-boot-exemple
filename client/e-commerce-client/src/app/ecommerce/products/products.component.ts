import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductOrder } from "../models/product-order";
import { Product } from "../models/product";
import { ProductOrders } from "../models/product-orders";
import { Subscription } from "rxjs";
import { EcommerceService } from "../services/ecommerce.service";
import { productSelector } from "src/app/product/store/product.reducer";
import ProductState from "src/app/product/store/product.state";
import { Store } from "@ngrx/store";
import * as ProductActions from "src/app/product/store/product.action";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  sub: Subscription;
  subLoaProducts: Subscription;
  productSelected: boolean = false;

  constructor(
    private ecommerceService: EcommerceService,
    private http: HttpClient,
    private store: Store<ProductState>
  ) {}

  ngOnInit() {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();
    this.store.dispatch(ProductActions.BeginGetProductAction());
  }

  addToCart(order: ProductOrder) {
    this.ecommerceService.SelectedProductOrder = order;
    this.selectedProductOrder = this.ecommerceService.SelectedProductOrder;
    this.productSelected = true;
  }

  removeFromCart(productOrder: ProductOrder) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder.product),
        1
      );
    }
    this.ecommerceService.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    this.productSelected = false;
  }

  getProductIndex(product: Product): number {
    return this.ecommerceService.ProductOrders.productOrders.findIndex(
      value => value.product === product
    );
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }

  loadProducts() {
    this.subLoaProducts = this.store.select(productSelector).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.products.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 0));
        });
      },
      error => console.log(error)
    );
  }

  loadOrders() {
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    });
  }

  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.ecommerceService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
  }

  ngOnDestroy() {
    this.subLoaProducts.unsubscribe();
  }
}
