package com.pcplanet.repository;

import com.pcplanet.entity.ProductDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDescriptionRepository extends JpaRepository<ProductDescription, Integer> {
}
