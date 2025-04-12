package com.pcplanet.repository;

import com.pcplanet.entity.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Integer> {
    ProductAttribute findByNameIgnoreCase(String name);
}
