package org.fr.benissaecommerce.repository;

import org.fr.benissaecommerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Montassar.MEJRI on 31/10/2019.
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
}
