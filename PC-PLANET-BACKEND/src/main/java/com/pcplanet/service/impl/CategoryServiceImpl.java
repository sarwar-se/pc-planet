package com.pcplanet.service.impl;

import com.pcplanet.dto.CategoryDTO;
import com.pcplanet.entity.Category;
import com.pcplanet.repository.CategoryRepository;
import com.pcplanet.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryDTO getCategoryDetailsByName(String categoryName) {
        return CategoryDTO.ofEntity(categoryRepository.findByName(categoryName));
    }
}
