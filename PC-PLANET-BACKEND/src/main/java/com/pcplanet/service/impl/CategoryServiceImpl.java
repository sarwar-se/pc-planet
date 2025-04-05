package com.pcplanet.service.impl;

import com.pcplanet.dto.ProductVariantDTO;
import com.pcplanet.dto.category.CategoryDTO;
import com.pcplanet.dto.category.CategoryDetailsDTO;
import com.pcplanet.dto.category.CategoryInfoDTO;
import com.pcplanet.entity.Category;
import com.pcplanet.repository.CategoryRepository;
import com.pcplanet.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryDTO> getAllCategory() {
        var result = categoryRepository.findAll();
        return result.stream().map(CategoryDTO::ofEntity).toList();
    }

    @Override
    public List<CategoryInfoDTO> getCategories() {
        var result = categoryRepository.findAll();
        return result.stream().map(CategoryInfoDTO::ofEntity).toList();
    }

    @Override
    public CategoryDetailsDTO getCategoryDetailsByName(String categoryName) {
        var result = categoryRepository.findByName(categoryName);
        return result == null ? null : CategoryDetailsDTO.ofEntity(result);
    }

    @Override
    public List<ProductVariantDTO> getProductVariantsByCategoryId(int categoryId) {
        var result = categoryRepository.findById(categoryId);
        var filterKey = result.map(Category::getFilterKeys)
                .orElse(Collections.emptyList());
        return filterKey.stream().map(ProductVariantDTO::ofEntity).toList();
    }
}
