package com.pcplanet.repository;

import com.pcplanet.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
    Brand findByNameIgnoreCase(String name);
}
