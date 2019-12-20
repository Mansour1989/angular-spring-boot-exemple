import { State, Selector, Action, StateContext } from "@ngxs/store";
import { GetProducts, DeleteProduct } from "./product-action-ngxs";
import { ProductService } from "src/app/services/product.service";
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/ecommerce/models/product';

export class ProductStateModel {
  products: Product[];
  doc: String;
}

@State<ProductStateModel>({
  name: "products",
  defaults: {
    products: [],
    doc: 'Select an existing document or create a new one to get started'
  }
})
export class ProductStateNgxs {
  constructor(private productService: ProductService) { }

  @Selector()
  static getPrductList(state: ProductStateModel) {
    return state.products;
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductStateModel>) {
    return this.productService.getProductsList().pipe(
      tap(result => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          products: result
        });
      })
    );
  }


  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, { id }: DeleteProduct) {
    return this.productService.deleteProduct(id).pipe(
      tap(() => {
        const state = ctx.getState();
        const filteredArray = state.products.filter(item => item.id !== id);
        ctx.setState({
          ...state,
          products: filteredArray
        });
      })
    );
  }
}
