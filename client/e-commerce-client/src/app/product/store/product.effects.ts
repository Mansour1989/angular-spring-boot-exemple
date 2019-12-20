import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import * as ProductActions from './product.action';
import { Product } from 'src/app/ecommerce/models/product';
import { ProductService } from 'src/app/services/product.service';


@Injectable()
export class ProductEffects {
  constructor(private http: HttpClient, private action$: Actions, private productService: ProductService,) {}

  GetProducts$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProductActions.BeginGetProductAction),
      mergeMap(action =>
        this.productService.getProductsList().pipe(
          map((data: Product[]) => {
            return ProductActions.SuccessGetProductAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ProductActions.ErrorProductAction(error));
          })
        )
      )
    )
  );
}
