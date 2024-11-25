package com.pcplanet.repository;

import com.pcplanet.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
    SubCategory findByName(String name);
}