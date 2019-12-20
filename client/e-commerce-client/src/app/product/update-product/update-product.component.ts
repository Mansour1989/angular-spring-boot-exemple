import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/ecommerce/models/product";
import { Observable } from "rxjs";
import { UploadFileService } from "src/app/services/upload-file.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.css"]
})
export class UpdateProductComponent implements OnInit {
  id: number;
  product: Product;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  fileUploads: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private uploadService: UploadFileService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.getProductWithId();
  }

  getProductWithId() {
    this.productService.getProduct(this.id).subscribe(
      data => {
        console.log("Product to update:", data);
        this.product = data;
      },
      error => console.log(error)
    );
    this.product = new Product();
  }

  updateProduct() {
    this.productService
      .updateProduct(this.id, this.product)
      .subscribe(data => console.log(data), error => console.log(error));
    this.product = new Product();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(["/products"]);
  }

  onSubmit() {
    this.updateProduct();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService
      .pushFileToStorage(this.currentFileUpload, this.product.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          console.log("File is completely uploaded!");
          this.getProductWithId();
        }
      });
    this.selectedFiles = undefined;
  }
}
