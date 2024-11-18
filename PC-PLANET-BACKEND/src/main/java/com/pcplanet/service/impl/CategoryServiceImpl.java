package com.pcplanet.service.impl;

import com.pcplanet.dto.CategoryDTO;
import com.pcplanet.repository.CategoryRepository;
import com.pcplanet.service.CategoryService;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryDTO getCategoryDetailsByName(String categoryName) {
        var result = categoryRepository.findByName(categoryName);
        return result == null ? null : CategoryDTO.ofEntity(result);
    }
}
