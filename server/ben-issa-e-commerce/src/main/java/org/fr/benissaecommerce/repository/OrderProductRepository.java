package org.fr.benissaecommerce.repository;

import org.fr.benissaecommerce.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Montassar.MEJRI on 31/10/2019.
 */
public interface OrderProductRepository  extends JpaRepository<OrderProduct, Long> {
}
