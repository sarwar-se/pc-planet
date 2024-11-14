package com.pcplanet.repository;

import com.pcplanet.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Category findByName(String categoryName);
}
