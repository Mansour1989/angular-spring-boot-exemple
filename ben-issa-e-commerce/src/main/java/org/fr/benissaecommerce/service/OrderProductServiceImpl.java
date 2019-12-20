package org.fr.benissaecommerce.service;

import org.fr.benissaecommerce.model.OrderProduct;
import org.fr.benissaecommerce.repository.OrderProductRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by Montassar.MEJRI on 31/10/2019.
 */
@Service
@Transactional
public class OrderProductServiceImpl implements OrderProductService {

    private OrderProductRepository orderProductRepository;

    public OrderProductServiceImpl(OrderProductRepository orderProductRepository) {
        this.orderProductRepository = orderProductRepository;
    }

    @Override
    public OrderProduct create(OrderProduct orderProduct) {
        return this.orderProductRepository.save(orderProduct);
    }
}
