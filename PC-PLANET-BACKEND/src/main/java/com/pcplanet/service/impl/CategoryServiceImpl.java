package com.pcplanet.service.impl;

import com.pcplanet.dto.CategoryDTO;
import com.pcplanet.dto.CategoryInfoDTO;
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
    public List<CategoryInfoDTO> getCategories() {
        var result = categoryRepository.findAll();
        return result.stream().map(CategoryInfoDTO::ofEntity).toList();
    }

    @Override
    public CategoryDTO getCategoryDetailsByName(String categoryName) {
        var result = categoryRepository.findByName(categoryName);
        return result == null ? null : CategoryDTO.ofEntity(result);
    }
}
