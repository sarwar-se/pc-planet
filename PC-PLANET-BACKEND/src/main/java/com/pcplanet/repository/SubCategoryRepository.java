package com.pcplanet.repository;

import com.pcplanet.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
    SubCategory findByNameIgnoreCase(String name);

    List<SubCategory> findByCategoryId(int id);
}