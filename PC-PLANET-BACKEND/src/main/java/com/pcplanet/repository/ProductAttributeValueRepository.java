package com.pcplanet.repository;

import com.pcplanet.entity.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductAttributeValueRepository extends JpaRepository<ProductAttributeValue, Integer> {
    ProductAttributeValue findByValueIgnoreCase(String value);
}
