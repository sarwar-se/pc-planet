package com.pcplanet.service.impl;

import com.pcplanet.dto.productAttribute.ProductAttributeDTO;
import com.pcplanet.dto.subCategory.CUSubCategoryDTO;
import com.pcplanet.dto.subCategory.SubCategoryDTO;
import com.pcplanet.dto.subCategory.SubCategoryDetailsDTO;
import com.pcplanet.entity.SubCategory;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.CategoryRepository;
import com.pcplanet.repository.SubCategoryRepository;
import com.pcplanet.service.SubCategoryService;
import com.pcplanet.utils.ServiceUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class SubCategoryServiceImpl implements SubCategoryService {
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryServiceImpl(CategoryRepository categoryRepository,
                                  SubCategoryRepository subCategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    @Override
    public List<SubCategoryDTO> getSubCategoriesByCategory(int categoryId) {
        var result = subCategoryRepository.findByCategoryId(categoryId);
        return result.stream().map(SubCategoryDTO::ofEntity).toList();
    }

    @Override
    public SubCategoryDetailsDTO getSubCategoryDetailsByName(String name) {
        var result = subCategoryRepository.findByNameIgnoreCase(name.toLowerCase());
        return result == null ? null : SubCategoryDetailsDTO.ofEntity(result);
    }

    @Override
    public List<ProductAttributeDTO> getProductAttributesBySubCategory(int subCategoryId) {
        var result = subCategoryRepository.findById(subCategoryId);
        var attributes = result.map(SubCategory::getAttributes)
                .orElse(Collections.emptyList());
        return attributes.stream().map(ProductAttributeDTO::ofEntity).toList();
    }

    @Override
    public void saveSubCategory(CUSubCategoryDTO subCategoryDTO) {
        if (subCategoryDTO.getCategoryId() == null) {
            ServiceHelper.categoryNullThrowException();
        }

        var category = categoryRepository.findById(subCategoryDTO.getCategoryId())
                .orElseThrow(() -> {
                    log.warn("Category not found with id: {}", subCategoryDTO.getCategoryId());
                    return new ServiceException(ErrorCode.CATEGORY_NOT_FOUND);
                });

        SubCategory subCategory;

        if (subCategoryDTO.getId() != null) {
            subCategory = subCategoryRepository.findById(subCategoryDTO.getId())
                    .orElseThrow(() -> {
                        log.warn("Sub category not found with id: {}", subCategoryDTO.getId());
                        return new ServiceException(ErrorCode.SUB_CATEGORY_NOT_FOUND);
                    });
        } else {
            var subCategoryExists = subCategoryRepository.findByNameIgnoreCase(subCategoryDTO.getName().toLowerCase());
            if (subCategoryExists != null) {
                log.warn("Sub category already exists with name: {}", subCategoryDTO.getName());
                throw new ServiceException(ErrorCode.SUB_CATEGORY_ALREADY_EXISTS);
            }
            subCategory = new SubCategory();
        }

        subCategory.setName(subCategoryDTO.getName());
        subCategory.setCategory(category);

        subCategoryRepository.save(subCategory);
        log.info("Sub category saved or updated");
    }

    @Override
    public void deleteSubCategoryById(int id) {
        var subCategory = subCategoryRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Product sub category not found with id: {}", id);
                    return new ServiceException(ErrorCode.SUB_CATEGORY_NOT_FOUND);
                });

        subCategoryRepository.delete(subCategory);
    }

    @Override
    public List<SubCategoryDTO> getSubCategories() {
        var results = subCategoryRepository.findAll();
        return ServiceUtils.simpleMap(results, SubCategoryDTO::ofEntity);
    }
}
