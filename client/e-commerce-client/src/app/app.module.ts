import { EffectsModule } from "@ngrx/effects";
import { EcommerceService } from "./ecommerce/services/ecommerce.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EcommerceComponent } from "./ecommerce/ecommerce.component";
import { ProductsComponent } from "./ecommerce/products/products.component";
import { OrdersComponent } from "./ecommerce/orders/orders.component";
import { ShoppingCartComponent } from "./ecommerce/shopping-cart/shopping-cart.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { ProductComponent } from "./product/product.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductService } from "./services/product.service";
import { UpdateProductComponent } from "./product/update-product/update-product.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { UploadFileService } from "./services/upload-file.service";
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ProductEffects } from './product/store/product.effects';
import { UserService } from './services/user.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductReducer } from './product/store/product.reducer';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';
import { ProductStateNgxs } from './product/store-ngxs/product-state-ngxs';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { ErrorInterceptor } from './shared/error.interceptor';
import { fakeBackendProvider } from './shared/fake-backend';
import { MyHttpInterceptor } from './users/my-account/my-http-interceptor';
import { AuthState } from './store-auth-ngxs/auth-state-ngxs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    EcommerceComponent,
    ProductsComponent,
    OrdersComponent,
    ShoppingCartComponent,
    NavBarComponent,
    ProductComponent,
    ProductListComponent,
    UpdateProductComponent,
    AddProductComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    EffectsModule.forRoot([ProductEffects]),
    StoreModule.forRoot({ products: ProductReducer }),
    StoreRouterConnectingModule.forRoot({}),
    NgxsModule.forRoot(
      [ProductStateNgxs, AuthState],
      {
        developmentMode: !environment.production
      }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token']
    })
  ],
  exports: [
    MatFormFieldModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    EcommerceService,
    UploadFileService,
    ProductService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // }
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MyHttpInterceptor,
    //   multi: true
    // },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
