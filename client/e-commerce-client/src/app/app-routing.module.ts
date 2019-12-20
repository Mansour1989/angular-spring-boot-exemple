import { AddProductComponent } from "./product/add-product/add-product.component";
import { EcommerceComponent } from "./ecommerce/ecommerce.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { UpdateProductComponent } from "./product/update-product/update-product.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/authentication.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: EcommerceComponent
  , canActivate: [AuthGuard] 
},
  { path: "products", component: ProductListComponent
  , canActivate: [AuthGuard]
 },
  { path: "add", component: AddProductComponent },
  { path: "update/:id", component: UpdateProductComponent },
  {
    path: "users",
    loadChildren: "./users/users.module#UsersModule"
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/users/sign-in"
  },
  {
    path: "404",
    component: NotFoundComponent
  },
  {
    path: "**",
    redirectTo: "/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
