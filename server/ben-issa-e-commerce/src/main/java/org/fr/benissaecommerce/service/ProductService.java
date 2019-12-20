package org.fr.benissaecommerce.service;

import org.fr.benissaecommerce.model.Product;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Map;

/**
 * Created by Montassar.MEJRI on 31/10/2019.
 */
@Validated
public interface ProductService {

    @NotNull Iterable<Product> getAllProducts();

    Product getProduct(@Min(value = 1L, message = "Invalid product ID.") long id);

    Product save(Product product);

    Product updateProduct(@Min(value = 1L, message = "Invalid product ID.") long id,Product product);

    Map<String, Boolean> deleteProduct(@Min(value = 1L, message = "Invalid product ID.") long id);
}
