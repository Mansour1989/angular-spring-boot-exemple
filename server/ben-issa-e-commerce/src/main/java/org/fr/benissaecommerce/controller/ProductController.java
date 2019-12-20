package org.fr.benissaecommerce.controller;

import org.fr.benissaecommerce.model.Product;
import org.fr.benissaecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Map;

/**
 * Created by Montassar.MEJRI on 31/10/2019.
 */

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(value = {"", "/"})
    public @NotNull Iterable<Product> getProducts() {
        return productService.getAllProducts();
    }

    @GetMapping(path = {"/{id}"})
    public @NotNull Product getProduct(@PathVariable("id") Long id) {
        return productService.getProduct(id);
    }

    @PostMapping
    public Product createEmployee(@Valid @RequestBody Product product) {
        return productService.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateEmployee(@PathVariable(value = "id") Long productId,
                                                  @Valid @RequestBody Product productDetails) {

        return ResponseEntity.ok(productService.updateProduct(productId, productDetails));
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteEmployee(@PathVariable(value = "id") Long productId) {
        return productService.deleteProduct(productId);
    }
}