package com.pcplanet.service.impl;

import com.pcplanet.dto.productAttribute.ProductAttributeDTO;
import com.pcplanet.dto.category.CategoryDTO;
import com.pcplanet.dto.category.CategoryDetailsDTO;
import com.pcplanet.dto.category.CategoryInfoDTO;
import com.pcplanet.entity.Category;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.CategoryRepository;
import com.pcplanet.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
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
        var result = categoryRepository.findByNameIgnoreCase(categoryName);
        return result == null ? null : CategoryDetailsDTO.ofEntity(result);
    }

    @Override
    public List<ProductAttributeDTO> getProductAttributesByCategoryId(int categoryId) {
        var result = categoryRepository.findById(categoryId);
        var attributes = result.map(Category::getAttributes)
                .orElse(Collections.emptyList());
        return attributes.stream().map(ProductAttributeDTO::ofEntity).toList();
    }

    @Override
    public void insertCategory(CategoryDTO categoryDTO) {
        var categoryExists = categoryRepository.findByNameIgnoreCase(categoryDTO.getName().toLowerCase());
        if (categoryExists != null) {
            log.warn("Category already exists with name: {}", categoryDTO.getName());
            throw new ServiceException(ErrorCode.CATEGORY_ALREADY_EXISTS);
        }

        categoryRepository.save(CategoryDTO.ofDTO(categoryDTO));
        log.info("Saved new category");
    }
}
