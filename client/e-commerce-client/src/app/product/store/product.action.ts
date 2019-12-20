import { props, createAction } from "@ngrx/store";
import { Product } from "src/app/ecommerce/models/product";

export const GetProductAction = createAction("[Product] - Get Product");

export const CreateProductAction = createAction(
  "[Product] - Create Product",
  props<Product>()
);

export const BeginGetProductAction = createAction(
  "[Product] - Begin Get Product"
);

export const SuccessGetProductAction = createAction(
  "[Product] - Success Get Product",
  props<{ payload: Product[] }>()
);

export const BeginCreateProductAction = createAction(
  "[Product] - Begin Create Product",
  props<{ payload: Product }>()
);

export const SuccessCreateProductAction = createAction(
  "[Product] - Success Create Product",
  props<{ payload: Product }>()
);

export const ErrorProductAction = createAction(
  "[Product] - Error",
  props<Error>()
);
