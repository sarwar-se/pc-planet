package com.pcplanet.service.impl;

import com.pcplanet.dto.brand.BrandDTO;
import com.pcplanet.dto.brand.CUBrandDTO;
import com.pcplanet.entity.Brand;
import com.pcplanet.entity.SubCategory;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.BrandRepository;
import com.pcplanet.repository.CategoryRepository;
import com.pcplanet.repository.SubCategoryRepository;
import com.pcplanet.service.BrandService;
import com.pcplanet.utils.ServiceUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    public BrandServiceImpl(BrandRepository brandRepository,
                            CategoryRepository categoryRepository,
                            SubCategoryRepository subCategoryRepository) {
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    @Override
    public List<BrandDTO> findBrandsByCategory(int id) {
        var result = categoryRepository.findById(id);
        return result.map(category -> category.getBrands().stream().map(BrandDTO::ofEntity).toList())
                .orElse(Collections.emptyList());
    }

    @Override
    public List<BrandDTO> findBrandsBySubCategory(int id) {
        var result = subCategoryRepository.findById(id);
        return result.map(category -> category.getBrands().stream().map(BrandDTO::ofEntity).toList())
                .orElse(Collections.emptyList());
    }

    @Override
    @Transactional
    public void saveBrand(CUBrandDTO brandDTO) {
        if (brandDTO.getCategoryId() == null) {
            ServiceHelper.categoryNullThrowException();
        }

        var category = categoryRepository.findById(brandDTO.getCategoryId())
                .orElseThrow(() -> {
                    log.warn("Category not found with id: {}", brandDTO.getCategoryId());
                    return new ServiceException(ErrorCode.CATEGORY_NOT_FOUND);
                });

        SubCategory subCategory = null;
        if (brandDTO.getSubCategoryId() != null) {
            subCategory = subCategoryRepository.findById(brandDTO.getSubCategoryId())
                    .orElseThrow(() -> {
                        log.warn("Sub-category not found with id: {}", brandDTO.getSubCategoryId());
                        return new ServiceException(ErrorCode.SUB_CATEGORY_NOT_FOUND);
                    });
        }

        Brand brand;

        if (brandDTO.getId() != null) {
            brand = brandRepository.findById(brandDTO.getId())
                    .orElseThrow(() -> {
                        log.warn("Product brand not found with id: {}", brandDTO.getId());
                        return new ServiceException(ErrorCode.BRAND_NOT_FOUND);
                    });
        } else {
            var brandExists = brandRepository.findByNameIgnoreCase(brandDTO.getName());
            if (brandExists != null) {
                log.warn("Brand already exists with name: {}", brandDTO.getName());
                throw new ServiceException(ErrorCode.BRAND_ALREADY_EXISTS);
            }

            brand = new Brand();
        }

        if (brandDTO.getName() != null && !brandDTO.getName().isEmpty()) {
            brand.setName(brandDTO.getName());
        }

        if (!category.getBrands().contains(brand) && subCategory == null) {
            category.getBrands().add(brand);
        }

        if (subCategory != null && !subCategory.getBrands().contains(brand)) {
            subCategory.getBrands().add(brand);
        }

        brandRepository.save(brand);
        log.info("Brand saved or updated");
    }

    @Override
    @Transactional
    public void deleteProductBrandById(int id) {
        var brand = brandRepository.findById(id).orElseThrow(() -> {
            log.warn("Product brand not found with id: {}", id);
            return new ServiceException(ErrorCode.BRAND_NOT_FOUND);
        });

        // Remove the brand from all related categories
        for (var category : brand.getCategories()) {
            category.getBrands().remove(brand);
        }
        brand.getCategories().clear();

        // Remove the brand from all related sub-categories
        for (var subCategory : brand.getSubCategories()) {
            subCategory.getBrands().remove(brand);
        }
        brand.getSubCategories().clear();

        brandRepository.save(brand);

        brandRepository.delete(brand);
    }

    @Override
    public List<BrandDTO> getBrands() {
        var results = brandRepository.findAll();
        return ServiceUtils.simpleMap(results, BrandDTO::ofEntity);
    }
}
