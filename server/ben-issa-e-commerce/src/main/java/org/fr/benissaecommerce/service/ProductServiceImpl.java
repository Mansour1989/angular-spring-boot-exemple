package org.fr.benissaecommerce.service;

import org.fr.benissaecommerce.exception.ResourceNotFoundException;
import org.fr.benissaecommerce.model.Product;
import org.fr.benissaecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import javax.validation.constraints.Min;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Montassar.MEJRI on 31/10/2019.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProduct(long id) {
        return productRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    @Override
    public Product save(Product product) {

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(@Min(value = 1L, message = "Invalid product ID.") long id, Product product) {
        Product productoUpdate  = getProduct(id);

        productoUpdate.setName(product.getName());
        productoUpdate.setDescription(product.getDescription());
        productoUpdate.setPrice(product.getPrice());

        final Product updatedProduct = productRepository.save(productoUpdate);

        return  updatedProduct;
    }

    @Override
    public Map<String, Boolean> deleteProduct(@Min(value = 1L, message = "Invalid product ID.") long id) {
        Product productoDelete  = getProduct(id);
        productRepository.delete(productoDelete);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
