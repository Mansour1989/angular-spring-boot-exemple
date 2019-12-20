package org.fr.benissaecommerce.service;


import org.fr.benissaecommerce.model.OrderProduct;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

;

/**
 * Created by Montassar.MEJRI on 31/10/2019.
 */
public interface OrderProductService {
    OrderProduct create(@NotNull(message = "The products for order cannot be null.") @Valid OrderProduct orderProduct);

}
