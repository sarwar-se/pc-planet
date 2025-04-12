package com.pcplanet.service.impl;

import com.pcplanet.dto.brand.BrandDTO;
import com.pcplanet.dto.brand.CreateBrandDTO;
import com.pcplanet.entity.Brand;
import com.pcplanet.entity.SubCategory;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.BrandRepository;
import com.pcplanet.repository.CategoryRepository;
import com.pcplanet.repository.SubCategoryRepository;
import com.pcplanet.service.BrandService;
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
    public void insertBrand(CreateBrandDTO brandDTO) {
        if (brandDTO.getCategoryId() == null) {
            ServiceHelper.categoryNullThrowException();
        }

        var category = categoryRepository.findById(brandDTO.getCategoryId())
                .orElseThrow(() -> {
                    ServiceHelper.categoryNotFoundThrowException(brandDTO.getCategoryId());
                    return null;
                });

        SubCategory subCategory = null;
        if (brandDTO.getSubCategoryId() != null) {
            subCategory = subCategoryRepository.findById(brandDTO.getSubCategoryId())
                    .orElseThrow(() -> {
                        ServiceHelper.subCategoryNotFoundThrowException(brandDTO.getSubCategoryId());
                        return null;
                    });
        }

        var brandExists = brandRepository.findByNameIgnoreCase(brandDTO.getName());
        if (brandExists != null) {
            log.warn("Brand already exists with name: {}", brandDTO.getName());
            throw new ServiceException(ErrorCode.BRAND_ALREADY_EXISTS);
        }

        var brand = new Brand();
        brand.setName(brandDTO.getName());

        category.getBrands().add(brand);
        if (subCategory != null) {
            subCategory.getBrands().add(brand);
        }

        brandRepository.save(brand);
        log.info("Saved new brand");
    }
}
