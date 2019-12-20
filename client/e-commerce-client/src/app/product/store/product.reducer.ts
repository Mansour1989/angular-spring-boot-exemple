
import {
  createReducer,
  Action,
  on,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

import * as ProductActions from "./product.action";
import { Product } from "src/app/ecommerce/models/product";
import  ProductState, { initializeState } from './product.state';

export const intialState = initializeState();

const reducerProduct = createReducer(
  intialState,
  on(ProductActions.GetProductAction, state => state),
  on(
    ProductActions.CreateProductAction,
    (state: ProductState, product: Product) => {
      return {
        ...state,
        Products: [...state.Products, product],
        ProductError: null
      };
    }
  ),
  on(
    ProductActions.SuccessGetProductAction,
    (state: ProductState, { payload }) => {
      return { ...state, Products: payload };
    }
  ),
  on(
    ProductActions.SuccessCreateProductAction,
    (state: ProductState, { payload }) => {
      return {
        ...state,
        Products: [...state.Products, payload],
        ProductError: null
      };
    }
  ),
  on(ProductActions.ErrorProductAction, (state: ProductState, error: Error) => {
    console.log(error);
    return { ...state, ProductError: error };
  })
);

export function ProductReducer(
  state: ProductState | undefined,
  action: Action
) {
  return reducerProduct(state, action);
}

let productFS = createFeatureSelector<ProductState>("products");
export let productSelector = createSelector(productFS, state => state.Products);
