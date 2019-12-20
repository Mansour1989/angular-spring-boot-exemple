package org.fr.benissaecommerce.repository;

import org.fr.benissaecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Montassar.MEJRI on 31/10/2019.
 */
//@RepositoryRestResource
public interface ProductRepository extends JpaRepository <Product, Long> {
}