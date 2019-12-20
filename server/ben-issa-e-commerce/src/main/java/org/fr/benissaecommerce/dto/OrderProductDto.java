package org.fr.benissaecommerce.dto;

import org.fr.benissaecommerce.model.Product;

/**
 * Created by Montassar.MEJRI on 31/10/2019.
 */
public class OrderProductDto {

    private Product product;
    private Integer quantity;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
