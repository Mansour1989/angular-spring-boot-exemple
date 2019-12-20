import { Product } from 'src/app/ecommerce/models/product';

export default interface ProductState {
  Products: Array<Product>;
}

export const initializeState = () => {
  return { Products: Array<Product>() };
};
