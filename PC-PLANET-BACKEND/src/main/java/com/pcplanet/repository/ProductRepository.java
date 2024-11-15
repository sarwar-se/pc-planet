package com.pcplanet.repository;

import com.pcplanet.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>, ProductRepositoryCustom {
    List<Product> findByNameContainsIgnoreCase(String name);
}
