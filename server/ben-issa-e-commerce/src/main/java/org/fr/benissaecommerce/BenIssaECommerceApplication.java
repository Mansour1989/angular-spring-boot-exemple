package org.fr.benissaecommerce;

import org.fr.benissaecommerce.model.Product;
import org.fr.benissaecommerce.service.ProductService;
import org.fr.benissaecommerce.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.annotation.Resource;

@SpringBootApplication
public class BenIssaECommerceApplication {

	@Autowired
	ProductService productService;
	@Resource
	StorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(BenIssaECommerceApplication.class, args);
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			productService.save(new Product(1L, "TV Set","desc1", 300.00, "http://placehold.it/200x100"));
			productService.save(new Product(2L, "Game Console","desc2", 200.00, "http://placehold.it/200x100"));
			productService.save(new Product(3L, "Sofa","desc3",00.00, "http://placehold.it/200x100"));
			productService.save(new Product(4L, "Icecream","desc4", 5.00, "http://placehold.it/200x100"));
			productService.save(new Product(5L, "Beer", "desc5",3.00, "http://placehold.it/200x100"));
			productService.save(new Product(6L, "Phone", "desc6",500.00, "http://placehold.it/200x100"));
			productService.save(new Product(7L, "Watch", "desc7",30.00, "http://placehold.it/200x100"));

			System.out.println(System.getProperty("user.home"));

			storageService.deleteAll();
			storageService.init();

		};



	}

}
